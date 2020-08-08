<template>
    <section>
        <md-card>
            <div>
                <v-tabs v-model="tab" background-color="primary" dark>
                    <v-tab v-for="service in services" :key="service.id" @click="resetTab">{{ service.name }}</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                <v-tab-item v-for="(tabItem, index) in tabItems" :key="index">
                    <v-card flat>
                        <v-card-text>
                            <div>
                                <p class="provider-heading">Select Your Provider</p>
                                <div class="d-flex flex-wrap justify-content-start">
                                    <div v-for="(item, index) in tabItem" :key="index" :class="{service_container_selected: selectedItem===item, service_container_unselected: selectedItem!==item}" @click="setSelectedItem(item, index)">
                                        <img class="service_image" :src="item.image_url"/>
                                        <p>{{ item.name }}</p>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between input-wrapper">
                                    <v-select v-if="selectedItemVariations.length>0" v-model="selectedVariation" :items="selectedItemVariations" item-text="name" item-value="id" :menu-props="{ top: true, offsetY: true }" :label="selectedItemVariationLabel" return-object></v-select>
                                    <v-text-field v-if="biller_identifier_name" v-model="biller_identifier" :label="biller_identifier_name" single-line></v-text-field>
                                    <v-text-field v-if="selectedItem" v-model="billing_amount" label="Amount" single-line :readonly="amountReadOnly"></v-text-field>
                                </div>
                                <div>
                                  <p v-if="responseError" class="text-danger text-center">{{ responseErrorMessage }}</p>
                                </div>
                                <div class="d-flex flex-row-reverse">
                                    <v-btn v-if="selectedItem" large color="primary" :loading="submitTransactionLoading" :disabled="submitTransactionLoading" @click="submitTransaction">Make Payment</v-btn>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
            </div>
        </md-card>
        <v-snackbar v-model="snackbar">
            {{ snackbar_text }}
            <template v-slot:action="{ attrs }"><v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn></template>
        </v-snackbar>
    </section>
</template>
<script>
import network from '@/network';
import routes from '@/network/routes';

export default {
  data() {
    return {
      tab: null,
      services: [],
      tabItems: [],
      selectedItem: null,

      selectedItemVariations: [],
      selectedVariation: { id: 0 },
      selectedItemVariationLabel: '',

      biller_identifier: '',
      biller_identifier_name: '',
      billing_amount: 0,
      amountReadOnly: false,
      submitTransactionLoading: false,
      responseError: false,
      responseErrorMessage: '',

      snackbar: false,
      snackbar_text: 'Hello, I\'m a snackbar',

      isServiceContainerSelected: false,
    };
  },
  watch: {
    services(list) {
      list.forEach((item, index) => {
        network.get(routes.servicesByCategory(item.id))
          .then((response) => {
            console.log('response from service id is ', response);
            const responseData = response.data.body;
            console.log('index is ', index, ' and response data is ', responseData);
            this.tabItems[index] = responseData;
            console.log('tab items are ', this.tabItems);
          })
          .catch((error) => {
            console.log('error from service id is ', error.response);
          });
      });
    },
    selectedVariation(val) {
      console.log('selected variation is ', val);
      this.amountReadOnly = val.fixed_price === 'yes';
      this.billing_amount = val.amount;
    },
    tabItems(items) {
      console.log('items is ', items);
    },
  },
  created() {
    this.getBillServices();
  },
  methods: {
    resetTab() {
      this.selectedItem = null;
      this.selectedItemVariations = [];
      this.selectedVariation = { id: 0 };
      this.selectedItemVariationLabel = '';

      this.biller_identifier = '';
      this.biller_identifier_name = '';
      this.billing_amount = 0;
      this.amountReadOnly = false;
      this.responseError = false;
    },
    setSelectedItem(item) {
      console.log('clicked on ', item);
      this.selectedItem = item;
      this.selectedItemVariationLabel = item.variation_label;
      this.selectedItemVariations = item.variation_list;
      this.biller_identifier_name = item.biller_identifier_name;
    },
    getBillServices() {
      network.get(routes.categories)
        .then((response) => {
          const responseData = response.data.body;
          this.services = responseData.filter((item) => !item.name.toLowerCase().includes('data') && !item.name.toLowerCase().includes('airtime'));
          console.log('service is ', this.services);
        })
        .catch((error) => {
          console.log('error in servie bills is ', error.response);
        });
    },
    submitTransaction() {
      if (this.selectedItem == null) {
        this.showToast('You have not selected a service...');
        return false;
      }
      console.log('select item variations is ', this.selectedItemVariations);
      if (this.selectedItemVariations.length > 0 && this.selectedVariation.id === 0) {
        this.showToast(`You have not selected a ${this.selectedItemVariationLabel}`);
        return false;
      }
      const transactionData = {
        service_id: this.selectedItem.id,
        biller_identifier: this.biller_identifier,
        amount: this.billing_amount,
        variation_id: this.selectedVariation.id,
      };
      console.log('transaction data is ', transactionData);
      this.submitTransactionLoading = true;
      //   return true;
      network.post(routes.createTransaction, transactionData)
        .then((response) => {
          console.log('transaction response is ', response);
          this.submitTransactionLoading = false;
          this.showPaystack();
        })
        .catch((error) => {
          console.log('transaction error is ', error.response);
          this.submitTransactionLoading = false;
          this.responseError = true;
          this.responseErrorMessage = error.response.data.data;
        });
      return true;
    },

    showToast(message) {
      this.snackbar_text = message;
      this.snackbar = true;
    },

    showPaystack() {
      console.log('showing paystack');
    },
  },
};
</script>

<style scoped>
.service_container {
    margin: 2rem;
}
.service_image {
    height: 5rem;
    width: 5rem;
}
.input-wrapper > *{
    padding: 2%;
}
.provider-heading {
  padding: 1.5rem;
  font-weight: 800;
}
.service_container_unselected {
  border: 2px solid #EEEEEE;
  margin: 1rem;
  width: 8rem;
  padding: 1rem;
  cursor: pointer;
}
.service_container_unselected:hover {
  border: 2px solid grey;
}
.service_container_selected {
  border: 2px solid green;
  margin: 1rem;
  width: 8rem;
  padding: 1rem;
}
</style>
