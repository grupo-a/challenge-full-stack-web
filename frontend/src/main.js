import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import './plugins/vee-validate/extendValidations'
import Loading from '@/components/Loading/Loading'

Vue.config.productionTip = false

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('Loading', Loading)

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
