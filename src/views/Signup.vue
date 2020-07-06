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
                                <h4 class="card-title text-center">Signup</h4>
                                <form @submit.prevent class="login-form mt-4">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group position-relative">
                                                <label>First name <span class="text-danger">*</span></label>
                                                <i data-feather="user" class="fea icon-sm icons"></i>
                                                <input v-model="firstName" type="text" class="form-control pl-5" placeholder="First Name" name="s" required="">
                                                <p v-if="firstNameError" class="text-danger">Enter first name</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group position-relative">
                                                <label>Last name <span class="text-danger">*</span></label>
                                                <i data-feather="user-check" class="fea icon-sm icons"></i>
                                                <input v-model="lastName" type="text" class="form-control pl-5" placeholder="Last Name" name="s" required="">
                                                <p v-if="lastNameError" class="text-danger">Enter last name</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group position-relative">
                                                <label>Your Email <span class="text-danger">*</span></label>
                                                <i data-feather="mail" class="fea icon-sm icons"></i>
                                                <input v-model="email" type="email" class="form-control pl-5" placeholder="Email" name="email" required="">
                                                <p v-if="emailError" class="text-danger">Enter your email</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group position-relative">
                                                <label>Phone Number<span class="text-danger">*</span></label>
                                                <i data-feather="phone" class="fea icon-sm icons"></i>
                                                <input v-model="phone" type="phone" class="form-control pl-5" placeholder="Phone" name="phone" required="">
                                                <p v-if="phoneError" class="text-danger">Enter your phone number</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group position-relative">
                                                <label>Password <span class="text-danger">*</span></label>
                                                <i data-feather="key" class="fea icon-sm icons"></i>
                                                <input v-model="password" type="password" class="form-control pl-5" placeholder="Password" required="">
                                                <p v-if="passwordError" class="text-danger">Enter your password</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group position-relative">
                                                <label>Confirm Password <span class="text-danger">*</span></label>
                                                <i data-feather="key" class="fea icon-sm icons"></i>
                                                <input v-model="confirmPassword" type="password" class="form-control pl-5" placeholder="Confirm Password" required="">
                                                <p v-if="confirmPasswordError" class="text-danger">Password do not match</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox">
                                                    <input v-model="termsCondition" type="checkbox" class="custom-control-input" id="customCheck1">
                                                    <label class="custom-control-label" for="customCheck1">I Accept <a href="#" class="text-primary">Terms And Condition</a></label>
                                                </div>
                                                <p v-if="termsConditionError" class="text-danger">You need to accept the terms and condition</p>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 mb-0"><p v-if="authenticationError" class="text-danger text-center">{{authenticationErrorText}}</p></div>
                                        <div class="col-md-12">
                                            <button v-if="!loading" class="btn btn-primary btn-block" @click="signup">Register</button>
                                            <button v-else class="btn btn-primary btn-block" disabled>
                                                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                                <span class="sr-only">Loading...</span>
                                            </button>
                                        </div>
                                        <div class="mx-auto">
                                            <p class="mb-0 mt-3"><small class="text-dark mr-2">Already have an account?</small> <router-link to="/login" class="text-dark font-weight-bold">Log in</router-link></p>
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

export default {
  data() {
    return {
      firstName: '',
      firstNameError: false,
      lastName: '',
      lastNameError: false,
      email: '',
      emailError: false,
      phone: '',
      phoneError: false,
      password: '',
      passwordError: false,
      confirmPassword: '',
      confirmPasswordError: false,
      termsCondition: '',
      termsConditionError: false,
      authenticationError: false,
      authenticationErrorText: '',
      loading: false,
    };
  },
  methods: {
    resetData() {
      this.firstNameError = false;
      this.lastNameError = false;
      this.emailError = false;
      this.phoneError = false;
      this.passwordError = false;
      this.confirmPasswordError = false;
      this.termsConditionError = false;
    },
    inputValidated() {
      if (!this.firstName) {
        this.firstNameError = true;
        return false;
      }
      if (!this.lastName) {
        this.lastNameError = true;
        return false;
      }
      if (!this.email) {
        this.emailError = true;
        return false;
      }
      if (!this.phone) {
        this.phoneError = true;
        return false;
      }
      if (!this.password) {
        this.passwordError = true;
        return false;
      }
      if (this.confirmPassword !== this.password) {
        this.confirmPasswordError = true;
        return false;
      }
      if (!this.termsCondition) {
        this.termsConditionError = true;
        return false;
      }
      return true;
    },
    signup() {
      this.resetData();
      if (!this.inputValidated()) return;
      const data = {
        name: `${this.firstName} ${this.lastName}`,
        email: this.email,
        phone_number: this.phone,
        password: this.password,
      };
      this.loading = true;
      console.log('loading...');
      network.post(routes.signup, data)
        .then((response) => {
          console.log('response is ', response);
          const responseData = response.data.data;
          this.$router.push({ name: constant.VerifyOTPRouteName, params: { email: responseData.email } });
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
      const [message] = data.data;
      this.authenticationErrorText = message;
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
}
.bg-home {
    /* margin-top: 5%; */
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
