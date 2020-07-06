import Vue from 'vue';
import './registerServiceWorker';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import { MdButton, MdSwitch, MdDialog, MdContent, MdCard, MdTabs, MdField, MdProgress } from 'vue-material/dist/components';
import router from './router';
import store from './store';
import navbar from './components/Navbar.vue';
import App from './App.vue';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';


Vue.config.productionTip = false;
Vue.component('navbar', navbar);
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
  render: (h) => h(App),
}).$mount('#app');
