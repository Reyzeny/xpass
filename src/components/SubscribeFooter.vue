<template>
    <div>
        <!-- Subscribe Start -->
        <section class="section bg-primary">
            <div class="bg-overlay bg-overlay-white"></div>
            <div class="container position-relative">
                <div class="row">
                    <div class="col-lg-2 col-md-2"></div>
                    <div class="col-lg-8 col-md-8 mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <div class="section-title text-center text-md-left">
                            <h1 class="title text-white title-dark mb-2">Subscribe to our weekly news</h1>
                            <p class="text-light para-dark">Sign up and receive the latest tips via email.</p>
                        </div>
                        <div class="subcribe-form mt-4 pt-2">
                            <form class="m-0">
                                <div class="form-group mb-0">
                                    <input type="email" id="email" name="email" class="rounded-pill" placeholder="E-mail :">
                                    <button type="submit" class="btn btn-pills btn-primary">Subscribe</button>
                                </div>
                            </form><!--end form-->
                        </div><!--end subscribe form-->
                    </div><!--end col-->
                    <div class="col-lg-2 col-md-2"></div>
                </div><!--end row-->
            </div><!--end container-->
        </section><!--end section-->
        <!-- Subscribe End -->

        <!-- Footer Start -->
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
                        <router-link to="/"  class="logo-footer">
                            <img src="@/assets/images/logo-light.png" class="logo" alt="">
                        </router-link>
                        <p class="mt-4">Start paying your bills, utitlities, airtime and data on xpass driven in a highly secured, easy and efficient technology.</p>
                        <ul class="list-unstyled social-icon social mb-0 mt-4">
                            <li class="list-inline-item"><a target="_blank" href="javascript:void(0)" class="rounded"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }"/></a></li>
                            <li class="list-inline-item"><a target="_blank" href="javascript:void(0)" class="rounded"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }"/></a></li>
                            <li class="list-inline-item"><a target="_blank" href="javascript:void(0)" class="rounded"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }"/></a></li>
                            <li class="list-inline-item"><a target="_blank" href="javascript:void(0)" class="rounded"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'linkedin' }"/></a></li>
                        </ul><!--end icon-->
                    </div><!--end col-->
                    <div class="col-lg-2 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <h4 class="text-light footer-head">Company</h4>
                        <ul class="list-unstyled footer-list mt-4">
                            <li><router-link to="/login" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i> About us</router-link></li>
                            <li><router-link to="/login" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i> Services</router-link></li>
                            <li><router-link to="/login" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i> Login</router-link></li>
                        </ul>
                    </div><!--end col-->
                    <div class="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <h4 class="text-light footer-head">Useful Links</h4>
                        <ul class="list-unstyled footer-list mt-4">
                            <li><router-link to="/" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i> Terms of Services</router-link></li>
                        </ul>
                    </div><!--end col-->

                    <div class="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <h4 class="text-light footer-head">Newsletter</h4>
                        <p class="mt-4">Sign up and receive the latest tips via email.</p>
                        <form>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="foot-subscribe form-group position-relative">
                                        <label>Write your email <span class="text-danger">*</span></label>
                                        <font-awesome-icon :icon="{ prefix: 'fa', iconName: 'inbox' }"/>
                                        <input type="email" name="email" id="emailsubscribe" class="form-control pl-5 rounded" placeholder="Your email : " required>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <input type="submit" id="submitsubscribe" name="send" class="btn btn-soft-primary btn-block" value="Subscribe">
                                </div>
                            </div>
                        </form>
                    </div><!--end col-->
                </div><!--end row-->
            </div><!--end container-->
        </footer><!--end footer-->
        <footer class="footer footer-bar">
            <div class="container text-center">
                <div class="row align-items-center">
                    <div class="col-sm-6">
                        <div class="text-sm-left">
                            <p class="mb-0">© 2020 Xpass</p>
                        </div>
                    </div><!--end col-->

                    <div class="col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <ul class="list-unstyled text-sm-right mb-0">
                            <li class="list-inline-item"><a href="javascript:void(0)"><img src="images/payments/american-ex.png" class="avatar avatar-ex-sm" title="American Express" alt=""></a></li>
                            <li class="list-inline-item"><a href="javascript:void(0)"><img src="images/payments/discover.png" class="avatar avatar-ex-sm" title="Discover" alt=""></a></li>
                            <li class="list-inline-item"><a href="javascript:void(0)"><img src="images/payments/master-card.png" class="avatar avatar-ex-sm" title="Master Card" alt=""></a></li>
                            <li class="list-inline-item"><a href="javascript:void(0)"><img src="images/payments/paypal.png" class="avatar avatar-ex-sm" title="Paypal" alt=""></a></li>
                            <li class="list-inline-item"><a href="javascript:void(0)"><img src="images/payments/visa.png" class="avatar avatar-ex-sm" title="Visa" alt=""></a></li>
                        </ul>
                    </div><!--end col-->
                </div><!--end row-->
            </div><!--end container-->
        </footer><!--end footer-->
        <!-- Footer End -->
    </div>
</template>
<style scoped>
.section-title .title {
    font-size: 2rem;
    font-weight: bold;
}
.section {
  padding: 100px 0;
  position: relative;
}
.bg-primary {
  background-color: #2f55d4 !important;
}
.bg-overlay {
  background-color: rgba(60, 72, 88, 0.7);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.bg-overlay-gradient {
  background-color: rgba(47, 85, 212, 0.6);
}

.bg-overlay-white {
  background-color: rgba(255, 255, 255, 0.5);
}

.bg-overlay-gradient2 {
  background-image: -webkit-gradient(linear, left top, right top, from(#2eca8b), color-stop(#2f55d4), to(#2eca8b));
  background-image: linear-gradient(90deg, #2eca8b, #2f55d4, #2eca8b);
  opacity: 0.5;
}
.subcribe-form input {
  padding: 14px 20px;
  width: 100%;
  color: #3c4858 !important;
  border: none;
  outline: none !important;
  padding-right: 160px;
  padding-left: 30px;
  background-color: rgba(255, 255, 255, 0.8);
}

.subcribe-form button {
  position: absolute;
  top: 6px;
  right: 6px;
  outline: none !important;
}

.subcribe-form form {
  position: relative;
  max-width: 600px;
  margin: 0px auto;
}
.btn.btn-pills {
  border-radius: 30px;
}
.footer {
  background: #202942;
  padding: 60px 0;
  position: relative;
  color: #adb5bd;
}

.footer .logo-footer {
  font-size: 22px;
}
.footer .logo-footer .logo {
  width: 10rem;
  height: auto;
}

.footer .footer-head {
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 500;
}

.footer .foot-subscribe .form-control {
  background-color: #27314f;
  border: 1px solid #27314f;
  color: #f8f9fc;
}

.footer .foot-subscribe .form-control:focus {
  -webkit-box-shadow: none;
          box-shadow: none;
}

.footer .foot-subscribe.foot-white .form-control {
  color: #adb5bd;
}

.footer .foot-subscribe input::-webkit-input-placeholder {
  color: #adb5bd;
}

.footer .foot-subscribe input:-ms-input-placeholder {
  color: #adb5bd;
}

.footer .foot-subscribe input::-ms-input-placeholder {
  color: #adb5bd;
}

.footer .foot-subscribe input::placeholder {
  color: #adb5bd;
}

.footer .text-foot {
  color: #adb5bd;
}

.footer .footer-list {
  margin-bottom: 0;
}

.footer .footer-list li {
  margin-bottom: 10px;
}

.footer .footer-list li a {
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.footer .footer-list li a:hover {
  color: #e6e8ea;
}

.footer .footer-list li:last-child {
  margin-bottom: 0;
}

.footer.footer-bar {
  padding: 30px 0;
  border-top: 1px solid #3d4349;
}
.social-icon li a {
  color: #3c4858;
  border: 1px solid #3c4858;
  display: inline-block;
  height: 32px;
  width: 32px;
  line-height: 28px;
  text-align: center;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
  overflow: hidden;
  position: relative;
}

.social-icon li a .fea-social {
  stroke-width: 2;
}

.social-icon li a:hover {
  background-color: #2f55d4;
  border-color: #2f55d4 !important;
  color: #ffffff !important;
}

.social-icon li a:hover .fea-social {
  fill: #2f55d4;
}

.social-icon.social li a {
  color: #adb5bd;
  border-color: #adb5bd;
}
.btn-soft-primary {
  background-color: rgba(47, 85, 212, 0.2) !important;
  border: 1px solid rgba(47, 85, 212, 0.2) !important;
  color: #2f55d4 !important;
  -webkit-box-shadow: 0 3px 5px 0 rgba(47, 85, 212, 0.3);
          box-shadow: 0 3px 5px 0 rgba(47, 85, 212, 0.3);
}

.btn-soft-primary:hover, .btn-soft-primary:focus, .btn-soft-primary:active, .btn-soft-primary.active, .btn-soft-primary.focus {
  background-color: #2f55d4 !important;
  border-color: #2f55d4 !important;
  color: #ffffff !important;
}
</style>
