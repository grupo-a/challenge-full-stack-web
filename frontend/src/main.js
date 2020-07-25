import Vue from 'vue'
import App from '@/App.vue'
import { vuetify } from '@/plugins'
import router from '@/router'
import store from '@/store'
import { cpf } from '@/directives/custom-masks'
import { v4 as uuidv4 } from 'uuid'

Vue.config.productionTip = false

Vue.directive('cpf', cpf)
Vue.prototype.$uuidv4 = uuidv4
Vue.prototype.$appName = process.env.VUE_APP_NAME

new Vue({
  vuetify,
  router,
  store,
  render: vue => vue(App)
}).$mount('#app')

