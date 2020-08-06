<template>
    <header class="defaultscroll sticky">
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-subheader>XPASS</v-subheader>
                <v-list-item link>
                    <v-list-item-action><v-icon></v-icon></v-list-item-action><v-list-item-content><v-list-item-title>Dashboard</v-list-item-title></v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action><v-icon></v-icon></v-list-item-action><v-list-item-content><v-list-item-title><router-link to="/"> Send Money</router-link></v-list-item-title></v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action><v-icon></v-icon></v-list-item-action><v-list-item-content><v-list-item-title><router-link to="/"> Buy Airtime and Data</router-link></v-list-item-title></v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action><v-icon></v-icon></v-list-item-action><v-list-item-content><v-list-item-title><router-link to="/"> Pay Bills</router-link></v-list-item-title></v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app color="primary" dense dark clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title><router-link to="/dashboard" class="nav-home-title">XPASS</router-link></v-toolbar-title>
            <div class="d-flex align-center">
                <!-- <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/> -->
                <!-- <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100"/> -->
            </div>
            <v-spacer></v-spacer>
            <v-menu bottom origin="center center" transition="scale-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon>
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title><router-link to="/profile">Profile</router-link></v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title><router-link to="/logout">Logout</router-link></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar><br>
        <div v-if="!isBvnVerified" class="text-danger text-center">You have not verified your bvn. Click <router-link to="/profile">here</router-link> to verify now</div>
    </header>
</template>

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
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import network from '@/network';
import routes from '@/network/routes';

export default {
  data() {
    return {
      activeItem: 0,
      active: true,
      isBvnVerified: true,
      drawer: null,
    };
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated']),
  },
  created() {
    this.getCustomerInstance();
  },
  methods: {
    ...mapActions('user', []),
    getCustomerInstance() {
      network.get(routes.customerInstance)
        .then((response) => {
          console.log('customer instance response is ', response);
          const responseData = response.data.data;
          if (responseData.bvn === null || responseData.bvn_status === 'none') {
            this.isBvnVerified = false;
          }
          console.log(responseData.bvn === null || responseData.bvn_status === 'none');
          console.log('bvn verified is ', this.isBvnVerified);
        })
        .catch((error) => {
          console.log('customer instance error is ', error.response);
        });
    },
    showMe() {
      console.log('show me');
    },
  },
};
</script>
