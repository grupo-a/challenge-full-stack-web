const actions = {
  $actionChangeNavigationDrawer ({ commit }, value) {
    commit('$mutationSetIsNavigationDrawerOpen', value)
  },

  $actionSwitchNavigationDrawer ({ commit, state }) {
    commit('$mutationSetIsNavigationDrawerOpen', !state.isNavigationDrawerOpen)
  }
}

export default actions