<template>
    <section>
        <md-card class="card">
            <div class="card-header">{{ specific }}</div>
            <p class="card-subheader">Select Your Provider</p>
            <div class="d-flex flex-wrap justify-content-start">
                <md-progress-spinner v-if="products.length === 0" class="position-absolute spinner" :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
                <div v-for="(item, index) in products" :key="index" :class="{service_container_selected: selectedItem===item, service_container_unselected: selectedItem!==item}" @click="setSelectedItem(item, index)">
                    <img class="service_image" :src="item.image_url"/><br><br>
                    <p>{{ item.name }}</p>
                </div>
            </div>
            <div class="row input-wrapper mt-2 p-2">
              <div class="col-md-4" v-if="selectedItemVariations.length>0">
                <v-select v-model="selectedVariation" :items="selectedItemVariations" item-text="name" item-value="id" :menu-props="{ top: true, offsetY: true }" :label="selectedItemVariationLabel" return-object></v-select>
                <p v-if="selectedVariationError" class="text-danger">Select an item</p>
              </div>
              <div class="col-md-4" v-if="biller_identifier_name">
                <v-text-field v-model="biller_identifier" :label="biller_identifier_name" single-line></v-text-field>
                <p v-if="biller_identifier_error" class="text-danger">Enter a valid {{ biller_identifier_name }}</p>
              </div>
              <div class="col-md-4" v-if="selectedItem">
                <v-text-field v-model="billing_amount" label="Amount" single-line :readonly="amountReadOnly"></v-text-field>
                <p v-if="billing_amount_error" class="text-danger">Enter a valid Amount</p>
              </div>
            </div>
            <div v-if="responseError">
              <p class="text-danger text-center">{{ responseErrorMessage }}</p>
            </div>
            <div class="d-flex flex-row-reverse mt-2 p-2">
                <v-btn v-if="selectedItem" :loading="submitTransactionLoading" large color="primary" @click="submitTransaction">{{ specific }}</v-btn>
            </div>
        </md-card>
    </section>
</template>

<script>

import network from '@/network';
import routes from '@/network/routes';

/**
 *biller_identifier_name: "Phone Number"
convinience_fee: 0
created_at: "2020-07-15 04:48:17"
deleted_at: null
description: null
edit_variant_amount: "yes"
id: 5
image: "airtel-data.jpg"
image_url: "http://142.93.121.56/site-files/services/airtel-data.jpg"
max_amount: 0
min_amount: 0
name: "Airtel Data"
order: 0
provider_id: 1
provider_validate_id: 1
serviceID: "airtel-data"
service_category_id: 2
slug: "airtel-data"
status: "active"
updated_at: "2020-07-15 04:48:17"
variation_label: "Plan"
variation_list: Array(17)
0:
amount: 49.99
created_at: "2020-07-15 04:48:18"
deleted_at: null
fixed_price: "yes"
id: 1
name: "25MB - 1Day"
order: 0
service_id: 5
slug: "airtel-data-25MB"
status: "active"
updated_at: "2020-07-15 04:48:18"
 */

export default {
  name: 'service_airtime_data',
  props: ['service_id', 'specific'],
  data() {
    return {
      products: [],
      selectedItem: null,

      selectedItemVariations: [],
      selectedVariation: { id: 0 },
      selectedItemVariationLabel: '',
      selectedVariationError: false,

      biller_identifier: '',
      biller_identifier_name: '',
      biller_identifier_error: false,
      billing_amount: 0,
      billing_amount_error: false,
      amountReadOnly: false,

      snackbar: false,
      snackbar_text: 'Hello, I\'m a snackbar',

      responseError: false,
      responseErrorMessage: '',
      submitTransactionLoading: false,
    };
  },
  created() {
    console.log('service id is ', this.service_id);
    this.getServiceByCategory(this.service_id);
  },
  watch: {
    selectedVariation(val) {
      console.log('selected variation is ', val);
      this.amountReadOnly = val.fixed_price === 'yes';
      this.billing_amount = val.amount;
      this.resetData();
    },
  },
  methods: {
    setSelectedItem(item) {
      console.log('clicked on ', item);
      this.resetData();
      this.selectedVariation = { id: 0 };
      this.selectedItem = item;
      this.selectedItemVariationLabel = item.variation_label;
      this.selectedItemVariations = item.variation_list;
      this.biller_identifier_name = item.biller_identifier_name;
    },

    submitTransaction() {
      this.resetData();
      if (this.selectedItemVariations.length > 0 && this.selectedVariation.id === 0) {
        console.log('selectedVariationError');
        this.selectedVariationError = true;
        return false;
      }
      if (this.biller_identifier_name && !this.biller_identifier) {
        console.log('biller_identifier_error');
        this.biller_identifier_error = true;
        return false;
      }
      if (!this.billing_amount || (!this.amountReadOnly && this.billing_amount <= 0)) {
        console.log('billing_amount_error');
        this.billing_amount_error = true;
        return false;
      }
      console.log('proceeding');
      const transactionData = {
        service_id: this.selectedItem.id,
        biller_identifier: this.biller_identifier,
        amount: this.billing_amount,
        variation_id: this.selectedVariation.id,
      };
      console.log('transaction data is ', transactionData);
      this.submitTransactionLoading = true;
      network.post(routes.createTransaction, transactionData)
        .then((response) => {
          console.log('purcahse response is ', response);
          this.submitTransactionLoading = false;
        })
        .catch((error) => {
          console.log('purchase error is ', error.response);
          this.submitTransactionLoading = false;
          this.responseError = true;
          this.responseErrorMessage = error.response.data.data;
        });
      return true;
    },
    resetData() {
      this.selectedVariationError = false;
      this.biller_identifier_error = false;
      this.billing_amount_error = false;
      this.responseError = false;
    },
    getServiceByCategory(categoryId) {
      network.get(routes.servicesByCategory(categoryId))
        .then((response) => {
          console.log('response of service by category is ', response);
          const responseData = response.data.body;
          console.log(responseData);
          this.products = responseData;
          console.log('this products ', this.products);
        })
        .catch((error) => {
          console.log('error of service by category is ', error.response);
        });
    },
    // purchase() {
    //   const transactionData = {
    //     service_id: this.selected_service_id,
    //     biller_identifier: this.phone_number,
    //     amount: this.amount,
    //     variant_id: 1,
    //   };
    //   network.post(routes.createTransaction, transactionData)
    //     .then((response) => {
    //       console.log('create transaction response is ', response);
    //     })
    //     .catch((error) => {
    //       console.log('create transaction error is ', error.response);
    //     });
    // },
  },
};
</script>
<style scoped>
.card{
  margin-top: 3rem;
}
.card .card-header{
  background: #F6F6F8;
  padding: 1rem;
  font-size: 1.2rem;
}
.card .card-subheader {
  padding: 1.5rem;
}
.card .product .unselected {
  border: 1px solid #F6F6F8;
  padding: 1rem;
  cursor: pointer;
}
.card .product .selected {
  border: 1px solid #1976D2;
  padding: 1rem;
  cursor: pointer;
}
.input-wrapper > *{
    padding: 2%;
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
.spinner{
  left: 40%;
}
</style>
