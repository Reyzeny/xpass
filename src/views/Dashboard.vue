<template>
<section>
    <navbar/>
    <section class="container-fluid">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
              <div class="welcome-message">
                  Hi {{firstName}},
              </div>
              <md-card class="card">
                <div class="d-flex justify-content-between">
                  <p class="available-balance">Your available balance</p>
                  <md-switch v-model="showBalance">Show Balance</md-switch>
                </div>
                <div class="d-flex align-items-center">
                  <p class="balance mb-0">=N= {{userBalance}}</p>
                  <md-button class="md-primary md-raised" @click="showFundDialog = true">Fund</md-button>                  
                  <md-dialog :md-active.sync="showFundDialog">
                    <md-dialog-title>How much would you like to fund?</md-dialog-title>
                    <md-content>
                        <form novalidate class="md-layout fund-dialog" @submit.prevent="validateUser">
                          <!-- <div class="md-title">Enter Amount</div> -->
                          <md-field :class="getValidationClass('amount')">
                            <label for="amount">Enter Amount</label>
                            <md-input type="number" name="amount" id="amount" autocomplete="number" v-model="form.amount" :disabled="sending" />
                            <span class="md-error" v-if="!$v.form.amount.required">The Amount is required</span>
                            <span class="md-error" v-else-if="!$v.form.amount.amount">Invalid Amount</span>
                          </md-field>
                        </form>
                    </md-content>
                    <md-progress-bar md-mode="indeterminate" v-if="sending" />

                    <md-dialog-actions>
                      <md-button class="md-primary" @click="showFundDialog = false">Cancel</md-button>
                      <md-button type="submit" class="md-primary" :disabled="sending" @click="showPaystack">Continue</md-button>
                    </md-dialog-actions>
                  </md-dialog>
                </div> 
              </md-card><br>



              <md-card class="card">
                <div class="d-flex flex-wrap justify-content-between">
                    <div v-for="item in categories" :key="item.id" class="card bill-list">
                      <router-link to="/">
                        <img src="@/assets/images/calender.png"/>
                        {{item.name}}
                      </router-link>
                    </div>
                </div>
              </md-card>


            </div>
            <div class="col-md-2"></div>
        </div>
    </section>
</section>
</template>
<script>
import network from '@/network';
import routes from '@/network/routes';
import { validationMixin } from 'vuelidate'
  import {
    required,
  } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data() {
    return {
      loading: false,
      error: false,
      firstName: 'Pelumi',
      userBalance: 0.00,
      categories: [],
      showBalance: false,
      showFundDialog: false,
      form: {
        amount: 0,
      },
      sending: false,
    };
  },
  validations: {
    form: {
      amount: {
        required,
      },
    }
  },
  created() {
    this.loadCategories();
  },
  watch: {
    // call again the method if the route changes
    $route: 'loadCategories',
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
    },
    validateUser () {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.fundWallet();
        }
    },
    fundWallet() {

    },
    loadCategories() {
      this.error = false;
      this.loading = true;
      network.get(routes.categories)
        .then((response) => {
          let responseData = response.data.body;
          console.log('response data is ', responseData);
          this.categories = responseData;
        })
        .catch((error) => {
          console.log('error is ', error);
        });
    },
    showPaystack() {

    }
  },
  
};
</script>

<style scoped>
.welcome-message {
  font-size: 1.6rem;
  padding: 1rem 0 1rem 0;
}
.card {
  padding: 2% 2% 2% 2%;
}
.card .bill-list {

}
.available-balance {
  margin: 16px 16px 16px 0;
  font-weight: 400;
  color: #9E9E9E;
}
.balance-container {
  height: 2rem;
}
.fund-dialog {
  padding: 1.5rem;
}

.categories {
  display: flex;
}
.card-item {
  border: 1px solid blue;
  padding: 2rem;
}
</style>
