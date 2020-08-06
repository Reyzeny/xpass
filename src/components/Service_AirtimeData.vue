<template>
    <section>
        <md-card class="card">
            <div class="card-header">{{ specific }}</div>
            <p class="card-subheader">Select Your Provider</p>
            <!-- <div class="d-flex justify-content-around">
              <div class="product" v-for="product in products" :key="product.id">
                <img :src="product.image_url"/>
                <p class="text-center">{{product.name}}</p>
              </div>
            </div>
            <div class="d-flex justify-content-around">
              <v-select :items="products[selectedProductId].variation_list" v-model="variationSelected" item-text="name" filled label="Select "></v-select>
              <md-field>
                <label for="phone">Enter Phone</label>
                <md-input type="phone" name="phone" id="phone" autocomplete="phone" v-model="recipientValue" :disabled="disableRecipientValue"/>
              </md-field>
              <md-field>
                <label for="amount">Enter Amount</label>
                <md-input type="number" name="amount" id="amount" v-model="recipientAmount" :min="recipientValueMinAmount"/>
              </md-field>
            </div> -->
            <div class="d-flex flex-wrap justify-content-start">
                <div v-for="(item, index) in products" :key="index" :class="{service_container_selected: selectedItem===item, service_container_unselected: selectedItem!==item}" @click="setSelectedItem(item, index)">
                    <img class="service_image" :src="item.image_url"/>
                    <p>{{ item.name }}</p>
                </div>
            </div>
            <div class="d-flex justify-content-between input-wrapper">
                <v-select v-if="selectedItemVariations.length>0" v-model="selectedVariation" :items="selectedItemVariations" item-text="name" item-value="id" :menu-props="{ top: true, offsetY: true }" :label="selectedItemVariationLabel" return-object></v-select>
                <v-text-field v-if="biller_identifier_name" v-model="biller_identifier" :label="biller_identifier_name" single-line></v-text-field>
                <v-text-field v-if="selectedItem" v-model="billing_amount" label="Amount" single-line :readonly="amountReadOnly"></v-text-field>
            </div>
            <div class="d-flex flex-row-reverse">
                <v-btn v-if="selectedItem" large color="primary" @click="submitTransaction">{{ specific }}</v-btn>
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

      biller_identifier: '',
      biller_identifier_name: '',
      billing_amount: 0,
      amountReadOnly: false,

      snackbar: false,
      snackbar_text: 'Hello, I\'m a snackbar',
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
    },
  },
  methods: {
    setSelectedItem(item) {
      console.log('clicked on ', item);
      this.selectedItem = item;
      this.selectedItemVariationLabel = item.variation_label;
      this.selectedItemVariations = item.variation_list;
      this.biller_identifier_name = item.biller_identifier_name;
    },

    submitTransaction() {

    },

    // getServiceById(id) {
    //   network.get(routes.servicesByID(id))
    //     .then((response) => {
    //       console.log('response of service by id is ', response);
    //     //   let responseData = response.data.data;
    //     })
    //     .catch((error) => {
    //       console.log('error of service by id is ', error.response);
    //     });
    // },
    loadUIForProduct(id) {
      this.recipientTitle = this.products[id].biller_identifier_name;
      this.disableRecipientValue = this.products[id].edit_variant_amount === 'no';
      this.providerImageUrl = this.products[id].image_url;
      this.recipientValueMinAmount = this.products[id].min_amount;
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
    purchase() {
      const transactionData = {
        service_id: this.selected_service_id,
        biller_identifier: this.phone_number,
        amount: this.amount,
        variant_id: 1,
      };
      network.post(routes.createTransaction, transactionData)
        .then((response) => {
          console.log('create transaction response is ', response);
        })
        .catch((error) => {
          console.log('create transaction error is ', error.response);
        });
    },
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
</style>
