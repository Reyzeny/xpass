<template>
<section>
    <section class="container-fluid">
      <navbarwithside/>
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
              <div class="welcome-message">
                  Hi {{firstName}},
              </div>
              <md-card class="card">`
                <div class="d-flex justify-content-between">
                  <p class="available-balance">Your Available Balance</p>
                  <md-switch v-model="showBalance">Show Balance</md-switch>
                </div>
                <div class="d-flex align-items-center">
                  <p v-if="showBalance" class="balance mb-0 mr-2">=N= {{formattedUserBalance}}</p>
                  <p v-else class="balance mb-0 mr-2">=N= XXX XXX</p>
                  <md-button class="md-primary md-raised ml-2" @click="showFundDialog = true">Fund</md-button>
                  <md-dialog :md-active.sync="showFundDialog">
                    <md-dialog-title>How much would you like to fund?</md-dialog-title>
                    <md-content>
                        <form class="md-layout fund-dialog">
                          <md-progress-spinner v-if="showSpinner" class="position-absolute spinner" :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
                          <md-field>
                            <label for="amount">Enter Amount</label>
                            <md-input type="number" name="amount" id="amount" min="0" autocomplete="number" v-model="amount" :disabled="sending" step=".01"/>
                          </md-field>
                          <md-content>
                            <div v-if="showAmountError" class="text-danger">{{ amountErrorMessage }}</div>
                          </md-content>
                        </form>
                    </md-content>
                    <!-- <md-progress-bar md-mode="indeterminate" v-if="sending" /> -->
                    <md-dialog-actions>
                      <md-button class="md-primary" @click="showFundDialog = false">Cancel</md-button>
                      <md-button @click="processFunding" class="md-primary" :disabled="sending">Continue</md-button>
                    </md-dialog-actions>
                  </md-dialog>
                </div>
              </md-card><br>

              <md-card class="card">
                <div class="card-header">
                  Quick Actions
                </div>
                <div class="row">
                  <div class="col-md-6 col-xs-6 service-box">
                    <router-link class="link" :to="{ name:'Service', params:{ categoryId: 1, serviceOption: 'airtime_data', specific:'Buy Airtime' } }">
                      <div class="service-box-item">
                        <div>
                          <br>
                          <p class="text-center"><img height="40" width="40" src="@/assets/images/smartphone.svg"/></p>
                          <br>
                          <p>Buy Airtime</p>
                        </div>
                      </div>
                    </router-link>
                    <br>
                    <router-link class="link" :to="{ name:'Service', params:{ categoryId: 2, serviceOption: 'airtime_data', specific:'Buy Data' } }">
                      <div class="service-box-item">
                          <div>
                            <br>
                            <p class="text-center"><img height="40" width="40" src="@/assets/images/smartphone.svg"/></p>
                            <br>
                            <p>Buy Data</p>
                          </div>
                      </div>
                    </router-link>
                  </div>
                  <div class="col-md-6 col-xs-6 service-box">
                    <router-link class="link" :to="{ name:'Service', params:{ categoryId: 0, serviceOption: 'bank' } }">
                      <div class="service-box-item">
                          <div>
                            <br>
                            <p class="text-center"><img height="40" width="40" src="@/assets/images/bank.svg"/></p>
                            <br>
                            <p>Send Money</p>
                          </div>
                      </div>
                    </router-link>
                    <br>
                    <router-link class="link" :to="{ name:'Service', params:{ categoryId: 0, serviceOption: 'bills' } }">
                      <div class="service-box-item">
                          <div>
                            <br>
                            <p class="text-center"><img height="40" width="40" src="@/assets/images/bill.svg"/></p>
                            <br>
                            <p>Pay Bills</p>
                          </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </md-card>
              <br>
              <md-card  class="card">
                <div class="card-header">Latest Transactions</div><br>
                <div>
                  <div v-if="transactions.length <= 0" class="text-center">
                      <p><img src="@/assets/images/no_transactions.svg"/></p>
                      <p>No Transactions!</p>
                      <p>As you make transactions, summary will appear here</p>
                  </div>
                  <div v-else>

                  </div>
                </div>
              </md-card>
            </div>
            <div class="col-md-2"></div>
        </div>
    </section>
</section>
</template>
<script src="https://js.paystack.co/v1/inline.js"></script>
<script>
import network from '@/network';
import routes from '@/network/routes';
import { validationMixin } from 'vuelidate';
import {
  required,
} from 'vuelidate/lib/validators';
import paystack from 'vue-paystack';
import { mapGetters } from 'vuex';

export default {
  components: {
    paystack,
  },
  mixins: [validationMixin],
  data() {
    return {
      loading: false,
      error: false,
      firstName: 'Pelumi',
      lastName: '',
      email: '',
      userBalance: '0.00',
      categories: [],
      showBalance: false,
      showFundDialog: false,
      amount: 0.00,
      sending: false,
      showSpinner: false,
      transactions: [],
      paystack_key: 'pk_test_7dfcdc2c0d8e91d525e52ee606b01e707b805b09',
      paystackFundAmount: 0,
      showAmountError: false,
      amountErrorMessage: '',
    };
  },
  computed: {
    formattedUserBalance(){
      console.log('user ballance in formatted is ', this.userBalance);
      return parseFloat(this.userBalance).toFixed(2);
    }
  },
  created() {
    this.loadUserWallet();
  },
  watch: {
    amount(val) {
      if (val <= 0) return false;
      this.paystackFundAmount = parseInt(parseFloat(val).toFixed(2) * 100);
    }
  },
  mounted() {
    var scriptTag = document.createElement("script");
    scriptTag.src = "https://js.paystack.co/v1/inline.js";
    scriptTag.id = "paystack_document";
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
  },
  methods: {
    ...mapGetters('user', ['userData']),
    showPaystack(paymentReference){
      let vm = this;
      vm.firstName = this.userData().firstName;
      vm.lastName = this.userData().lastName;
      vm.email = this.userData().email;
      console.log('vm is ', vm);
      let handler = window.PaystackPop.setup({
        key: vm.paystack_key, // Replace with your public key
        email: vm.email,
        amount: vm.paystackFundAmount, // the amount value is multiplied by 100 to convert to the lowest currency unit
        currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
        firstname: vm.firstName,
        lastname: vm.lastName,
        reference: paymentReference, // Replace with a reference you generated
        callback: function(response) {
          console.log('paystack is callback');
          console.log(response);
          vm.showFundDialog = false;
          let finalizeData = {
            reference: paymentReference,
          };
          network.post(routes.finalizeWalletLoad, finalizeData)
            .then((response) => {
              console.log('response is ', response);
              vm.loadUserWallet();
            })
            .catch((error) => {
              console.log('error is ', error.response);
            });
        },
        onClose: function() {
          alert('Transaction was not completed, window closed.');
        },
      });
      handler.openIframe();
    },
    processFunding() {
      this.showAmountError = false;
      if (!this.inputValidated()) return;
      this.showSpinner = true;
      const walletData = {
        amount: this.paystackFundAmount,
      };
      network.post(routes.initiateWalletLoad, walletData)
        .then((response) => {
          this.showSpinner = false;
          console.log('initiate wallet load response is ', response);
          let responseData = response.data.data;
          console.log('response Data is ', responseData);
          this.showPaystack(responseData.transaction.reference);
        })
        .catch((error) => {
          this.showSpinner = false;
          console.log('initiate wallet load error is ', error.response);
          if (!error.response){
            this.amountErrorMessage = 'Check your internet connection'
          }else{
            this.amountErrorMessage = error.response.data;
          }
        });
    },
    inputValidated() {
      console.log(this.paystackFundAmount);
      if (this.paystackFundAmount <= 0){
        this.showAmountError = true;
        this.amountErrorMessage = 'Invalid Amount';
        return false;
      }
      return true;
    },

    loadUserWallet() {
      network.get(routes.userWallet)
        .then((response) => {
          console.log('user balance response is ', response);
          let responseData = response.data.data;
          this.userBalance = responseData;
        })
        .catch((error) => {
          console.log('error fetch user balance is ', error.response);
        });
    },

    loadCategories() {
      this.error = false;
      this.loading = true;
      network.get(routes.categories)
        .then((response) => {
          const responseData = response.data.body;
          console.log('response data is ', responseData);
          this.categories = responseData;
        })
        .catch((error) => {
          console.log('error is ', error);
        });
    },
    callback(response) {

    },
    close() {
      console.log('paystack is close');
      console.log('Payment closed');
    },
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
  font-weight: 800;
  font-size: 14px;
  /* color: #9E9E9E; */
  color: grey;
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
.item-image{
  width: 3rem;
  height: 3rem;
}
.spinner{
  left: 40%;
}
.card .card-header{
  background: #F6F6F8;
}
.service-box{
  padding: 3rem;
}
.service-box .service-box-item{
  border: 1px solid #1976D2;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
}
.service-box .service-box-item:hover{
  cursor: pointer;
  background: rgb(121, 161, 202);
  color: white;
}
.service-box .service-box-item p {
  font-size: 1rem;
}
.link {
  text-decoration: none !important;
}
</style>
