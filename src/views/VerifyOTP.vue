<template>
    <div class="bg bg-circle-gradiant">
        <navbar/>
        <!-- Hero Start -->
        <section class="bg-home d-flex align-items-center">
            <div class="bg-overlay bg-overlay-white"></div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5 col-md-8">
                        <div class="card login_page shadow rounded border-0">
                            <div class="card-body">
                                <h4 name="verify-otp-header" class="card-title text-center">Account Validation</h4>
                                <form @submit.prevent class="login-form mt-4">
                                    <div class="row">
                                        <div class="text-center">
                                            <p class="card-subtitle mb-2 text-muted text-center">Enter the 6 digit confirmation code sent to your email {{email}}</p>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group position-relative">
                                                <label>Enter OTP <span class="text-danger">*</span></label>
                                                <i data-feather="key" class="fea icon-sm icons"></i>
                                                <input v-model="otp" type="text" class="form-control pl-5" placeholder="OTP" required="">
                                                <p v-if="otpError" class="text-danger">Enter a valid otp</p>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 mb-0"><p v-if="authenticationError" class="text-danger text-center">{{authenticationErrorText}}</p></div>
                                        <div class="col-md-12">
                                            <button v-if="!loading" class="btn btn-primary btn-block" @click="verify">Continue</button>
                                            <button v-else class="btn btn-primary btn-block" disabled>
                                                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                                <span class="sr-only">Loading...</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
            </div> <!--end container-->
        </section><!--end section-->
        <!-- Hero End -->
    </div>
</template>

<script>
import network from '@/network';
import routes from '@/network/routes';
import constant from '@/constant';
import { mapActions } from 'vuex';

export default {
  name: 'VerifyOTP',
  beforeRouteEnter(to, from, next) {
    if (to.params.email) {
      // next((vm) => { vm.email = to.params.email; });
      next();
    } else {
      next({ path: constant.SignupRouteName });
    }
  },
  created() {
    if (this.$route.params.email) {
      this.email = this.$route.params.email;
    }
  },
  data() {
    return {
      loading: false,
      email: '',
      otp: '',
      otpError: false,
      authenticationError: false,
      authenticationErrorText: '',
    };
  },
  methods: {
    ...mapActions('user', ['changeAuthenticationState']),
    resetData() {
      this.otpError = false;
    },
    isEmailValid() {
      return true;
    },
    inputValidated() {
      console.log('this.email is ', this.email);
      console.log('this.otp is ', this.otp);
      if (!this.email) {
        return false;
      }
      if (!this.otp) {
        this.otpError = true;
        return false;
      }
      return true;
    },
    verify() {
      this.resetData();
      const data = {
        otp: this.otp,
        email: this.email,
      };
      console.log('data is ', data);
      if (!this.inputValidated()) return;
      console.log('input validated ');
      this.loading = true;
      network.post(routes.verifyotp, data)
        .then((response) => {
          this.loading = false;
          const responseData = response.data.data;
          console.log('response data is ', responseData);
          const data2 = {
            authState: true,
            token: 'lskjfl',
            email: this.email,
          };
          this.changeAuthenticationState(data2);
          this.$router.push({ name: constant.DashboardRouteName });
        })
        .catch((error) => {
          this.loading = false;
          const errorData = error.response;
          console.log('error data is ', errorData);
          if (!errorData) {
            this.showInternetProblem();
            return;
          }
          this.showError(errorData.data);
        });
    },
    showError(data) {
      this.authenticationError = true;
      this.authenticationErrorText = data.response_message;
    },
    showInternetProblem() {
      this.authenticationError = true;
      this.authenticationErrorText = constant.internet_connection_problem;
    },
  },
};
</script>

<style scoped>
.bg{
    position: relative;
    align-self: center;
    background-position: center center;
    background-size: cover;
    -ms-flex-item-align: center;
    -ms-grid-row-align: center;
    height: 100vh;
    overflow: scroll;
    font-weight: 300 !important;
}
.bg-home {
    height: 80vh;
    align-self: center;
}
.bg-circle-gradiant {
  background: radial-gradient(circle at 50% 50%, rgba(47, 85, 212, 0.1) 0%, rgba(47, 85, 212, 0.1) 33.333%, rgba(47, 85, 212, 0.3) 33.333%, rgba(47, 85, 212, 0.3) 66.666%, rgba(47, 85, 212, 0.5) 66.666%, rgba(47, 85, 212, 0.5) 99.999%);
}
@media (max-width: 767px) {
  .bg-home, .bg-half-170, .bg-half-260, .main-slider .slides .bg-slider, .bg-marketing {
    padding: 50px 0;
    height: auto;
    margin-top: 0%;
  }
}
</style>
