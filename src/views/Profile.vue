<template>
    <section>
      <navbarwithside/>
      <div>
        <v-card class="card">
          <v-card-title class="d-flex justify-content-between">
            <h1>Profile</h1>
            <!-- <v-btn outlined>Edit Profile</v-btn> -->
            <ProfileEdit :profiledata="profiledata"/>
          </v-card-title>
          <v-card-text>
            <div class="row">
              <div class="col-md-6">
                <p class="profile-title">Full Name</p>
                <p class="profile-text">{{ fullName }}</p>
              </div>
              <div class="col-md-6">
                <p class="profile-title">Email</p>
                <p class="profile-text">{{ email }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <p class="profile-title">Phone Number</p>
                <p class="profile-text">{{ phoneNumber }}</p>
              </div>
              <div class="col-md-6">
                <p class="profile-title">Account Type</p>
                <p class="profile-text">{{ accountType }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <p class="profile-title">Account Number</p>
                <p class="profile-text">{{ accountNumber }}</p>
              </div>
              <div class="col-md-6">
                <p class="profile-title">BVN</p>
                <p class="profile-text">{{ bvn }}</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </section>
</template>

<script>
import network from '@/network';
import routes from '@/network/routes';
import ProfileEdit from '@/views/ProfileEdit.vue';

export default {
  components: {
    ProfileEdit,
  },
  data() {
    return {
      fullName: '',
      email: '',
      accountNumber: '',
      bvn: '',
      phoneNumber: '',
      accountType: '',
      profiledata: null,
    };
  },
  created() {
    this.getCustomerInstance();
  },
  methods: {
    getCustomerInstance() {
      network.get(routes.customerInstance)
        .then((response) => {
          console.log('customer instance response is ', response);
          const responseData = response.data.data;
          this.profiledata = responseData;
          this.fullName = responseData.name;
          this.email = responseData.email;
          this.accountNumber = responseData.account_number ? responseData.account_number : 'not available';
          this.bvn = responseData.bvn === null || responseData.bvn === undefined ? 'not verified' : responseData.bvn;
          this.phoneNumber = responseData.phone_number === null ? 'not available' : responseData.phone_number;
          this.accountType = responseData.customer_type;
        })
        .catch((error) => {
          console.log('customer instance error is ', error.response);
        });
    },

    verifyBvn() {
      const bvnData = {
        bvn: this.bvn_number,
        date_of_birth: this.date_of_birth,
      };
      network.post(routes.verifyBvn, bvnData)
        .then((response) => {
          console.log('bvn verification response is ', response);
        })
        .catch((error) => {
          console.log('bvn verification error is ', error.response);
        });
    },
  },
};
</script>
<style scoped>
.card {
  margin: 2rem;
  padding: 2rem;
}
.profile-title {
  font-weight: 800 !important;
  font-size: 1rem;
  color: black;
}
.profile-text{
  font-size: 1rem;
  color: black;
}
</style>
