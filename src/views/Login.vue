<template>
    <div class="bg bg-circle-gradiant">
        <navbar/>
        <!-- Hero Start -->
        <section class="bg-home d-flex align-items-center">
            <div class="bg-overlay bg-overlay-white"></div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5 col-md-8">
                        <div class="card login-page bg-white shadow rounded border-0">
                            <div class="card-body">
                                <h4 class="card-title text-center">Login</h4>
                                <form @submit.prevent class="login-form mt-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group position-relative">
                                                <label>Your Email <span class="text-danger">*</span></label>
                                                <i data-feather="user" class="fea icon-sm icons"></i>
                                                <input v-model="username" type="email" class="form-control pl-5" placeholder="Email" name="email" required="">
                                                <p v-if="usernameError" class="text-danger">Enter a valid email address</p>
                                            </div>
                                        </div>

                                        <div class="col-lg-12">
                                            <div class="form-group position-relative">
                                                <label>Password <span class="text-danger">*</span></label>
                                                <i data-feather="key" class="fea icon-sm icons"></i>
                                                <input v-model="password" type="password" class="form-control pl-5" placeholder="Password" required="">
                                                <p v-if="passwordError" class="text-danger">Enter your password</p>
                                            </div>
                                        </div>

                                        <div class="col-lg-12">
                                            <div class="d-flex justify-content-between">
                                                <div class="form-group">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="customCheck1">
                                                        <label class="custom-control-label" for="customCheck1">Remember me</label>
                                                    </div>
                                                </div>
                                                <p class="forgot-pass mb-0"><a href="auth-re-password-three.html" class="text-dark font-weight-bold">Forgot password ?</a></p>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 mb-0"><p v-if="authenticationError" class="text-danger text-center">{{authenticationErrorText}}</p></div>
                                        <div class="col-lg-12 mb-0">
                                            <button v-if="!loading" class="btn btn-primary btn-block" @click="login">Sign in</button>
                                            <button v-else class="btn btn-primary btn-block" disabled>
                                                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                                <span class="sr-only">Loading...</span>
                                            </button>
                                        </div>
                                        <!-- <div class="col-lg-12 mt-4 text-center">
                                            <h6>Or Login With</h6>
                                            <ul class="list-unstyled social-icon mb-0 mt-3">
                                                <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i data-feather="facebook" class="fea icon-sm fea-social"></i></a></li>
                                                <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i data-feather="github" class="fea icon-sm fea-social"></i></a></li>
                                                <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i data-feather="twitter" class="fea icon-sm fea-social"></i></a></li>
                                                <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i data-feather="gitlab" class="fea icon-sm fea-social"></i></a></li>
                                            </ul>
                                        </div> -->
                                        <div class="col-12 text-center">
                                            <p class="mb-0 mt-3"><small class="text-dark mr-2">Don't have an account ?</small> <router-link to="/signup" class="text-dark font-weight-bold">Sign Up</router-link></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div><!---->
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

/*
account_number: null
auth_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWEyZjk3YTZlZWQ5NjcwZTdlNWZmNWU1YmY5NjY5ZjllNTUyZDA0ZjIwOWQwMjY3M2M2ZDJjN2QxZjBkNjVhZjlmMTY5YmQ5OWQ1YzM4NTUiLCJpYXQiOjE1OTM4ODg1MDYsIm5iZiI6MTU5Mzg4ODUwNiwiZXhwIjoxNjI1NDI0NTA2LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.FtPKn9XhjHTakHNXWzcCY4_j1oQJS-x0fWG0U_TLS2ZrG5m9SL3PTiDncpDQvPeY9x1uRoDcJVNwl_9NwwYdv3GDX-hhcap0jkZMmy2mXGYNDgI8Wel2LiY17b36WCdBU1Ks7Ox1VpgtFzTkRWJN-V4rY37ZXgzYnH3ElB9A47Mkt7BTbLi2Fpk5TqlFiyFVxjn5GkZPnfsyW6I36E27Y7mjYro9pkVj1bBXT_h11FwQnFL05DpSlf-ruhbg_zwpThGKhgbzIto0ZKtghulq_YVCfF8_Uizxl_vTvdWBTSqJIMadPl2W-zGMiAUEc47pIl-dYLFSTI7OYNvfnwcYmKX6oDrGQqUms_wnFOonM0qend5x4r5TmqW85UCbnHGkXYVcuwz8iK9NXvaQnsoC4FxwuSCDjFv73ymURK7mEQto5gHDORcaQi7anZDokpDSI-EyVNIxBZn2ZrIkzVvs8z30HCH9GuR1Hmp6GlbMVUryfeb0GwxwqS815KpS4Rlem5jTW8gpPKONY88TRX__o6e1g5KSIy_0P-YUI0BTTRUrz3F-0KW94YqHS6VE-jx9XNO-STA3oorphGDvUSHmOJ8W5cg2TgmKn74unNyJXw8xNh7DewIzjlSf5s1MpgkRNmoGV7tCwMaBjnAlnWmvD83UMcA72aje7EXKKWNoziw"
bvn: null
bvn_status: "none"
customer_level_id: 1
customer_level_name: "Bronze"
customer_type: "regular"
date_of_birth: null
email: "pelumi@kartk5.com"
identity_file: null
identity_status: "none"
identity_type: null
is_account_verified: "no"
name: "Pelumi Eniodunmo"
phone_number: "090123456789"
role: "customer"
status: "active"
*/

export default {
  data() {
    return {
      username: '',
      usernameError: false,
      password: '',
      passwordError: false,
      loading: false,
      authenticationError: false,
      authenticationErrorText: '',
    };
  },
  methods: {
    ...mapActions('user', ['changeAuthenticationState']),
    resetData() {
      this.usernameError = false;
      this.passwordError = false;
      this.authenticationError = false;
      this.authenticationErrorText = '';
    },
    inputsValidated() {
      if (!this.username) {
        this.usernameError = true;
        return false;
      }
      if (!this.password) {
        this.passwordError = true;
        return false;
      }
      return true;
    },
    login() {
      this.resetData();
      if (!this.inputsValidated()) return;
      const data = {
        username: this.username,
        password: this.password,
      };
      this.loading = true;
      network.post(routes.login, data)
        .then((response) => {
          this.loading = false;
          console.log('response is ', response);
          const responseData = response.data.data;
          console.log('response Data', responseData);
          const data2 = {
            authState: true,
            token: responseData.auth_token,
            email: responseData.email,
            firstName: responseData.name,
            lastName: '',
            bvn_status: responseData.bvn_status,
            is_account_verified: responseData.is_account_verified,
          };
          //
          console.log('running check');
          if (responseData.is_account_verified === 'no') {
            console.log('verified is no');
            this.changeAuthenticationState(data2);
            console.log('pushing to otp');
            this.$router.push({ name: constant.VerifyOTPRouteName, params: { email: responseData.email } });
          } else {
            console.log('verified is yes');
            this.changeAuthenticationState(data2);
            this.$router.push({ name: constant.DashboardRouteName });
          }
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
.login-page {
  font-size: 15px;
  background-position: center center;
}
.login-page .forgot-pass {
  z-index: 99;
  position: relative;
  font-size: 13px;
}
.bg{
    position: relative;
    align-self: center;
    background-position: center center;
    background-size: cover;
    -ms-flex-item-align: center;
    -ms-grid-row-align: center;
    height: 100vh;
    overflow: scroll;
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
    padding: 150px 0;
    height: auto;
  }
}
</style>
