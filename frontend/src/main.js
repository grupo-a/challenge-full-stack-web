import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import './plugins/vee-validate/extendValidations'

import './config/componentsVue'
import './config/useVue'

Vue.config.productionTip = false

let vm = new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')

export default vm