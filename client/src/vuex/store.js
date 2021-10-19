import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notification: {},
    drawer: null
  },
  mutations: {
    setNotification (state, payload) {
      state.notification = payload
    },
    setDrawer (state, payload) {
      state.drawer = payload
    }
  }
})
