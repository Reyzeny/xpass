<template>
    <header class="defaultscroll sticky">
        <v-app-bar app color="primary" dark clipped-left>
            <v-toolbar-title><router-link to="/" class="nav-home-title"> Xpass </router-link> </v-toolbar-title>
            <div class="d-flex align-center">
                <!-- <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/> -->
                <!-- <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100"/> -->
            </div>
            <v-spacer></v-spacer>
            <v-btn class="link" href="/" style="color: white;" text>
                <span class="mr-2 white-text">Home</span>
            </v-btn>
            <v-btn class="link" href="/login" style="color: white;" text>
                <span class="mr-2 white-text">Login</span>
            </v-btn>
            <v-btn class="link" href="/signup" style="color: white;" text>
                <span class="mr-2">Signup</span>
            </v-btn>
        </v-app-bar>
    </header>
</template>

<script>
export default {
  data() {
    return {
      userAuthenticated: true,
    };
  },
};
</script>

<style scoped>
.logo {
    width: 15rem;
    height: auto;
}
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
.nav-home-title {
    color: white !important;
    text-decoration: none !important;
}
.link {
    text-decoration: none !important;
}
</style>
