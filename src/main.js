import Vue from 'vue';
import './registerServiceWorker';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import {
  MdButton, MdSwitch, MdDialog, MdContent, MdCard, MdTabs, MdField, MdProgress,
} from 'vue-material/dist/components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faFacebook, faInstagram, faTwitter, faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import navbar from './components/Navbar.vue';
import navbarwithside from './components/NavbarWithSide.vue';
import subscribefooter from './components/SubscribeFooter.vue';
import App from './App.vue';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

library.add(faFacebook);
library.add(faInstagram);
library.add(faTwitter);
library.add(faLinkedin);
library.add(faInbox);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(Vuetify);

Vue.config.productionTip = false;
Vue.component('navbar', navbar);
Vue.component('navbarwithside', navbarwithside);
Vue.component('subscribe-footer', subscribefooter);
Vue.use(Vuesax, {

});
Vue.use(MdButton);
Vue.use(MdSwitch);
Vue.use(MdDialog);
Vue.use(MdContent);
Vue.use(MdCard);
Vue.use(MdField);
Vue.use(MdTabs);
Vue.use(MdProgress);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
