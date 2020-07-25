const state = {
  isNavigationDrawerOpen: false
}

const getters = {
  $getterIsNavigationDrawerOpen: (state) => state.isNavigationDrawerOpen
}

const mutations = {
  $mutationSetIsNavigationDrawerOpen (state, value) {
    state.isNavigationDrawerOpen = value
  }
}

const actions = {
  $actionChangeNavigationDrawer ({ commit }, value) {
    commit('$mutationSetIsNavigationDrawerOpen', value)
  },

  $actionSwitchNavigationDrawer ({ commit }) {
    commit('$mutationSetIsNavigationDrawerOpen', !state.isNavigationDrawerOpen)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
