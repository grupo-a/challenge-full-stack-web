import { mapActions } from 'vuex'

export default {
  name: 'AppBar',

  methods: {
    ...mapActions(['$actionSwitchNavigationDrawer'])
  }
}