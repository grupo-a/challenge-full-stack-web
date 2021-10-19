
import store from '../vuex/store'

export default {
  methods: {
    // SHOW SNACKBAR NOTIFICATION
    showNotification (data) {
      store.commit('setNotification', data)
    }
  }
}
