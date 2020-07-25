import Vue from 'vue'
import Vuex from 'vuex'

import GlobalComponents from '@/store/modules/globalComponents.js'
import Students from '@/store/modules/students.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    GlobalComponents,
    Students
  }
})
