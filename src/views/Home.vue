<template>
    <section>
        <navbar/>
        <!-- Hero Start -->
        <section class="bg-half-170 d-table w-100 overflow-hidden" id="home">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-7 col-md-7">
                        <div class="title-heading mt-4">
                            <div class="alert alert-transparent alert-pills shadow" role="alert">
                                <span class="badge badge-pill badge-primary mr-1">New</span>
                                <span class="content">Pay with card, ussd</span>
                            </div>
                            <h1 class="heading mb-3">The best way to pay your bills</h1>
                            <p class="para-desc text-muted">Xpass brings a faster way to pay your bills from your convenience with modern and digital financial services.</p>
                            <div class="mt-4 pt-2">
                                <router-link to="/dashboard"><button class="btn btn-primary mb-2 mr-2">Get started</button></router-link>
                            </div>
                        </div>
                    </div><!--end col-->
                    <div class="col-lg-5 col-md-5 mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <div class="classic-app-image position-relative">
                            <div class="bg-app-shape position-relative">
                                <img src="@/assets/images/classic01.png" class="img-fluid mover mx-auto d-block" alt="">
                            </div>
                            <!-- <div class="app-images d-none d-md-block">
                                <img src="@/assets/images/calender.png" class="img-fluid" alt="">
                            </div> -->
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
            </div><!--end container-->
        </section><!--end section-->
        <!-- Hero End -->

        <!-- Features Start -->
        <section class="sect1ion bg-light">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 text-center">
                        <div class="section-title mb-4 pb-2 pt-5">
                            <h2 class="title mb-4">What can you do on Xpass?</h2>
                            <!-- <p class="text-muted para-desc mb-0 mx-auto">Start working with <span class="text-primary font-weight-bold">Landrick</span> that can provide everything you need to generate awareness, drive traffic, connect.</p> -->
                        </div>
                    </div><!--end col-->
                </div><!--end row-->

                <div class="row justify-content-center align-items-center">
                    <div class="col-lg-8 col-md-8">
                        <div mt-4 pt-2 class="row">
                            <div class="col-md-6 col-12">
                                <div class="media features pt-4 pb-4">
                                    <div class="icon text-center rounded-circle text-primary mr-3 mt-2">
                                        <i data-feather="monitor" class="fea icon-ex-md text-primary"></i>
                                    </div>
                                    <div class="media-body">
                                        <h4 class="title">Buy Airtime</h4>
                                        <p class="text-muted para mb-0">Credit your phone number with airtime of any value on Airtel, MTN, 9mobile and Glo.</p>
                                    </div>
                                </div>
                            </div><!--end col-->

                            <div class="col-md-6 col-12">
                                <div class="media features pt-4 pb-4">
                                    <div class="icon text-center rounded-circle text-primary mr-3 mt-2">
                                        <i data-feather="feather" class="fea icon-ex-md text-primary"></i>
                                    </div>
                                    <div class="media-body">
                                        <h4 class="title">Buy Data</h4>
                                        <p class="text-muted para mb-0">Purchase mobile data or bundle on any network of your choice on Airtel, MTN, 9mobile and Glo.</p>
                                    </div>
                                </div>
                            </div><!--end col-->

                            <div class="col-md-6 col-12">
                                <div class="media features pt-4 pb-4">
                                    <div class="icon text-center rounded-circle text-primary mr-3 mt-2">
                                        <i data-feather="eye" class="fea icon-ex-md text-primary"></i>
                                    </div>
                                    <div class="media-body">
                                        <h4 class="title">Pay for your cable</h4>
                                        <p class="text-muted para mb-0">Purchase your cable subscription for DSTV, GOTV, Startimes and so on via xpass.</p>
                                    </div>
                                </div>
                            </div><!--end col-->

                            <div class="col-md-6 col-12">
                                <div class="media features pt-4 pb-4">
                                    <div class="icon text-center rounded-circle text-primary mr-3 mt-2">
                                        <i data-feather="user-check" class="fea icon-ex-md text-primary"></i>
                                    </div>
                                    <div class="media-body">
                                        <h4 class="title">Pay Utility Bills</h4>
                                        <p class="text-muted para mb-0">Pay your electricity bill, waste bill, and other utility bills on xpass.</p>
                                    </div>
                                </div>
                            </div><!--end col-->

                            <div class="col-md-6 col-12">
                                <div class="media features pt-4 pb-4">
                                    <div class="icon text-center rounded-circle text-primary mr-3 mt-2">
                                        <i data-feather="smartphone" class="fea icon-ex-md text-primary"></i>
                                    </div>
                                    <div class="media-body">
                                        <h4 class="title">Pay for internet services</h4>
                                        <p class="text-muted para mb-0">Purchase your internet data plans on any network via xpass.</p>
                                    </div>
                                </div>
                            </div><!--end col-->
                        </div><!--end row-->
                    </div><!--end col-->

                    <div class="col-lg-4 col-md-4 col-12 mt-4 pt-2 text-center text-md-right">
                        <img src="@/assets/images/feature.png" class="img-fluid" alt="">
                    </div><!--end col-->
                </div><!--end row-->
            </div><!--end container-->
        </section><!--end section-->
        <!-- Feature End -->

                <!-- Section Start -->
        <section class="section overflow-hidden">
            <div class="container mt-100 mt-60">
                <div class="row align-items-center">
                    <div class="col-lg-6 col-md-5">
                        <div class="app-feature-shape-left position-relative">
                            <div class="text-center text-md-left">
                                <img src="@/assets/images/classic02.png" class="img-fluid mover" alt="">
                            </div>
                        </div>
                    </div><!--end col-->

                    <div class="col-lg-6 col-md-7 mt-5 mt-sm-0">
                        <div class="section-title">
                            <h1 class="title mb-3">Safe &amp; Secure</h1>
                            <p class="para-desc text-muted">Your transactions right from funding your wallet to purchases are processed securely on xpass.</p>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
            </div><!--end container-->

            <div class="container mt-100 mt-60">
                <div class="row align-items-center">
                    <div class="col-lg-6 col-md-7 order-2 order-md-1 mt-5 mt-sm-0">
                        <div class="section-title">
                            <h1 class="title mb-3">Easy And Best Solution <br> To Pay Your Bills</h1>
                            <p class="para-desc text-muted">With a beautiful and easy to use interface and navigation, our platform provides easy navigation and clear actions that makes it easy for users to carry out their transactions efficiently.</p>
                        </div>
                    </div><!--end col-->

                    <div class="col-lg-6 col-md-5 order-1 order-md-2">
                        <div class="app-feature-shape-right position-relative">
                            <div class="text-center text-md-right">
                                <img src="@/assets/images/classic03.png" class="img-fluid mover" alt="">
                            </div>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
            </div><!--end container-->

            <div class="container mt-100 mt-60">
                <div class="row align-items-center">
                    <div class="col-lg-6 col-md-5">
                        <div class="app-feature-shape-left position-relative">
                            <div class="text-center text-md-left">
                                <img src="@/assets/images/classic04.png" class="img-fluid mover" alt="">
                            </div>
                        </div>
                    </div><!--end col-->

                    <div class="col-lg-6 col-md-7 mt-5 mt-sm-0">
                        <div class="section-title">
                            <h1 class="title mb-3">Awesome Customer Support</h1>
                            <p class="para-desc text-muted">We are here for you! Our contact lines are open 24/7 to help and support you incase you face any challenges with using our platform or performing a transaction.</p>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
            </div><!--end container-->
        </section><!--end section-->
        <!-- Section End -->
        <subscribe-footer/>
        <!-- Section End -->
    </section>
</template>

<style scoped>
.alert {
    font-size: 14px;
    padding: 8px 15px;
    border-radius: 6px;
    position: relative;
    margin-bottom: 1rem;
    padding: 0.75rem 1.25rem;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    border-radius: 0.25rem;
}
.alert.alert-pills {
    display: inline-block;
    border-radius: 30px;
}
.shadow {
    box-shadow: rgba(60, 72, 88, 0.15) 0px 0px 3px !important;
}
.title-heading .heading {
    font-size: 45px;
    letter-spacing: 1px;
    font-weight: 600;
}
.title-heading .para-desc {
    font-size: 18px;
}
.para-desc {
    max-width: 600px;
}
.text-muted {
    color: rgb(132, 146, 166) !important;
}
img{
    vertical-align: middle;
    border-style: none;
}
.classic-app-image .bg-app-shape {
    z-index: 0;
}
.classic-app-image .bg-app-shape:after {
  bottom: 3rem;
  left: -8rem;
  width: 55rem;
  height: 35rem;
  border-radius: 20rem;
  -webkit-transform: rotate(120deg);
          transform: rotate(120deg);
  opacity: 0.9;
}

.classic-app-image .app-images {
  position: absolute;
  bottom: 60px;
  right: -20px;
}

.classic-app-image .bg-app-shape:after,
.classic-saas-image .bg-saas-shape:after {
  content: " ";
  position: absolute;
  z-index: -1;
}

.classic-app-image .bg-app-shape:after,
.classic-saas-image .bg-saas-shape:after {
  -webkit-box-shadow: 0 0 40px rgba(47, 85, 212, 0.5);
          box-shadow: 0 0 40px rgba(47, 85, 212, 0.5);
  background-color: #2f55d4;
}
.app-feature-shape-right:after,
.app-feature-shape-left:after {
  bottom: 0rem;
  width: 30rem;
  height: 40rem;
  border-radius: 10rem;
}

.app-feature-shape-right:after {
  left: 10rem;
  -webkit-transform: rotate(150deg);
          transform: rotate(150deg);
}

.app-feature-shape-left:after {
  right: 10rem;
  -webkit-transform: rotate(210deg);
          transform: rotate(210deg);
}
.app-feature-shape-right:after,
.app-feature-shape-left:after,
.saas-feature-shape-left:after,
.saas-feature-shape-right:after,
.social-feature-left:after,
.social-feature-right:after {
  background: rgba(47, 85, 212, 0.1);
  -webkit-box-shadow: 0 0 40px rgba(47, 85, 212, 0.1);
          box-shadow: 0 0 40px rgba(47, 85, 212, 0.1);
}

/* .app-feature-shape-right,
.app-feature-shape-left, {
    z-index: -1;
} */
.app-feature-shape-left img, .app-feature-shape-right img{
    position: relative;
    z-index: 2;
}
.app-feature-shape-right:after,
.app-feature-shape-left:after,
.saas-feature-shape-left:after,
.saas-feature-shape-right:after,
.social-feature-left:after,
.social-feature-right:after {
  content: "";
  position: absolute;
  z-index: 1;
}

.section-title .title {
    font-size: 2rem;
    font-weight: bold;
}

@media (min-width: 768px){
    .d-md-block {
        display: block !important;
    }
    .app-feature-shape-right:after {
        /* left: 0; */
    }
    .app-feature-shape-left:after {
        /* right: 0; */
    }
    .section {
    padding: 60px 0;
  }
}
</style>
