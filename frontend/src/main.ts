import Vue from 'vue';
import Vmask from 'v-mask';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';

import './assets/app.css';

Vue.config.productionTip = false;

Vue.use(Vmask);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
