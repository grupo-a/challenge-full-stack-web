import { createApp } from 'vue';
// import Vuelidate from 'vuelidate';
// import vuetify from '@/plugins/vuetify';
import App from './App.vue';
import router from './router';

// Vue.use(Vuelidate);
// new Vue({
//   vuetify,
// }).$mount('#app');

createApp(App).use(router).mount('#app');
