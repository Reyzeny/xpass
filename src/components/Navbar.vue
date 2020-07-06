<template>
    <header id="topnav" class="defaultscroll sticky">
        <div>
            <vs-navbar v-model="activeItem" class="nabarx">
                <div slot="title">
                    <vs-navbar-title><router-link to="/"><img src="@/assets/images/logo-dark.png" height="1" alt="Xpass Logo"/></router-link></vs-navbar-title>
                </div>
                <vs-navbar-item index="0">
                    <router-link class="btn" to="/">Home</router-link>
                </vs-navbar-item>
                <vs-navbar-item index="1">
                    <router-link class="btn" to="/">Products</router-link>
                </vs-navbar-item>
                <vs-navbar-item index="2">
                    <router-link class="btn" to="/">About Us</router-link>
                </vs-navbar-item>
                <vs-navbar-item index="3">
                    <router-link class="btn" to="/">FAQs</router-link>
                </vs-navbar-item>
                <vs-navbar-item index="4">
                    <div v-if="!isAuthenticated">
                    <router-link to="/login" class="btn btn-secondary">Login</router-link>
                    </div>
                </vs-navbar-item>
                <vs-navbar-item index="5">
                    <div  v-if="!isAuthenticated">
                        <router-link to="/signup" tag="button" class="btn btn-primary">Sign Up</router-link>
                    </div>
                </vs-navbar-item>
                <vs-navbar-item index="6">
                    <div  v-if="isAuthenticated">
                        <router-link to="/dashboard" tag="button" class="btn btn-primary">My Account</router-link>
                    </div>
                </vs-navbar-item>
            </vs-navbar>
        </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      activeItem: 0,
    };
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated']),
  },
};
</script>

<style scoped>
#topnav .nabarx{
  padding: 1% 4% 1% 10%;
}
#topnav .logo{
    float: left;
}
.btn {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
}
</style>
