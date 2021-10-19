import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify.js'
import axios from 'axios'
import store from './vuex/store'

// USING MIXIN
import Mixin from './mixins/mixin'
Vue.mixin(Mixin)

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$api = 'http://localhost:3000'
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
