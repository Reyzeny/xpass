<template>
    <section>
        <v-card>
            <v-card-title class="card-title">Send To Bank</v-card-title><br>
            <v-card-subtitle class="card-subtitle">Enter details</v-card-subtitle>
            <v-card-text>
                <div class="row">
                    <div class="col-md-6">
                        <v-text-field v-model="amount" :label="'Amount'" single-line></v-text-field>
                        <p v-if="showAmountError" class="text-danger">Enter a valid amount</p>
                    </div>
                    <div class="col-md-6">
                        <v-select v-model="selectedBankObject" :items="bankList" item-text="bank_name" :menu-props="{ top: true, offsetY: true }" :label="'Bank'" return-object></v-select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <v-text-field v-model="accountNumber" :label="'Account Number'" single-line></v-text-field>
                        <p v-if="showSelectBankError" class="text-danger">Select A Bank or Enter An Account Number</p>
                    </div>
                    <div class="col-md-6">
                        <v-text-field v-model="accountName" :label="'Account Name'" :loading="loadingAccountName" single-line readonly></v-text-field>
                        <p v-if="showBankDetailsError" class="text-danger">Account Details Error</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <v-text-field v-model="narration" :label="'Narration'" single-line></v-text-field>
                    </div>
                </div>
                <div>
                  <p v-if="responseError" class="text-danger text-center">{{ responseErrorMessage }}</p>
                </div>
                <div class="row">
                    <div class="col-md-12 d-flex flex-row-reverse">
                        <v-btn color="primary" :loading="sendingMoney" :disabled="sendingMoney" @click="sendMoney">Send Money Now</v-btn>
                    </div>
                </div>
                <v-snackbar v-model="snackbar" :timeout="timeout">
                  {{ snackbarText }}
                  <template v-slot:action="{ attrs }">
                    <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
                  </template>
                  </v-snackbar>
            </v-card-text>
        </v-card>
    </section>
</template>
<script>
import network from '@/network';
import routes from '@/network/routes';

export default {
  data: () => ({
    amount: '',
    selectedBankObject: null,
    bankList: [],
    accountNumber: '',
    accountName: '',
    narration: '',

    showAmountError: false,
    showSelectBankError: false,
    loadingAccountName: false,
    showBankDetailsError: false,
    accountDetailsVerified: false,

    snackbar: false,
    timeout: 2000,
    snackbarText: '',

    sendingMoney: false,
    responseError: false,
    responseErrorMessage: '',
  }),
  created() {
    this.fetchBankList();
  },
  watch: {
    accountNumber() {
      this.showSelectBankError = false;
      if (this.selectedBankObject === null) {
        this.showSelectBankError = true;
        return;
      }
      if (this.accountNumber.length === 10 && this.selectedBankObject) {
        console.log('fetching acct details...');
        this.fetchAccountDetails(this.accountNumber);
      }
    },
    selectedBankObject() {
      if (this.selectedBankObject) {
        this.accountNumber = '';
        this.showSelectBankError = false;
      }
    },
  },
  methods: {
    fetchBankList() {
      network.get(routes.getBanks)
        .then((response) => {
          console.log('bank list response is ', response);
          const responseData = response.data.data;
          this.bankList = responseData;
        })
        .catch((error) => {
          console.log('bank list error is ', error.response);
        });
    },
    fetchAccountDetails(accountNumber) {
      this.loadingAccountName = true;
      this.showBankDetailsError = false;
      const details = {
        account_number: accountNumber,
        bank_id: this.selectedBankObject.id,
      };
      network.post(routes.getAccountDetails, details)
        .then((response) => {
          console.log('account details response is ', response);
          const [name] = response.data.data;
          this.accountName = name;
          this.loadingAccountName = false;
          this.accountDetailsVerified = true;
        })
        .catch((error) => {
          console.log('account details error is ', error.response);
          this.showBankDetailsError = true;
          this.accountName = '';
          this.loadingAccountName = false;
          this.accountDetailsVerified = false;
        });
    },
    sendMoney() {
      this.resetData();
      if (this.amount <= 0) {
        this.showAmountError = true;
        return false;
      }
      if (this.selectedBankObject === null || !this.accountNumber) {
        this.showSelectBankError = true;
        return false;
      }
      if (this.loadingAccountName) {
        this.showToast('Verifying Account Details, Please Wait...');
        return false;
      }
      if (!this.accountDetailsVerified) {
        this.showToast('Please complete the form...');
        return false;
      }
      this.sendingMoney = true;
      const fundsTransferData = {
        amount: this.amount,
        account_number: this.accountNumber,
        bank_id: this.selectedBankObject.id,
      };
      console.log('funds transfer data is ', fundsTransferData);
      network.post(routes.inititateFundsTransfer, fundsTransferData)
        .then((response) => {
          this.sendingMoney = false;
          console.log('funds transfer response is ', response);
        })
        .catch((error) => {
          this.sendingMoney = false;
          console.log('funds transfer error is ', error.response);
          this.responseError = true;
          this.responseErrorMessage = error.response.data.data;
        });
      return true;
    },
    resetData() {
      this.showAmountError = false;
      this.showSelectBankError = false;
      this.showBankDetailsError = false;
      this.snackbar = false;
      this.responseError = false;
    },
    showToast(message) {
      this.snackbarText = message;
      this.snackbar = true;
    },
  },
};
</script>
<style scoped>
.card-title {
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 800;
}
.card-subtitle {
  font-size: 1.5rem;
}
</style>
