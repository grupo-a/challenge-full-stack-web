import {
  getStudents,
  saveStudent,
  editStudent,
  deleteStudent
} from '@/api/students'

const state = {
  students: []
}

const getters = {
  $getterStudents: (state) => state.students
}

const mutations = {
  $mutationSetStudents (state, value) {
    state.students = value
  },

  $mutationAddStudent (state, value) {
    state.students.push(value)
  },

  $mutationEditStudent (state, value) {
    const index = state.students.findIndex(student => student.enrollment_id === value.enrollment_id)

    if (index > -1) {
      this._vm.$set(state.students, index, value)
    }
  },

  $mutationDeleteStudent (state, value) {
    const index = state.students.findIndex(student => student.enrollment_id === value.enrollment_id)

    if (index > -1) {
      this._vm.$delete(state.students, index)
    }
  },

  $mutationClearStudents (state) {
    state.students = []
  }
}

const actions = {
  $actionGetStudents ({ commit }) {
    return getStudents()
      .then(response => {
        commit('$mutationSetStudents', response.data)
      })
      .catch(e => {
        console.error(e)
      })
  },

  $actionSaveStudent ({ commit }, data) {
    return saveStudent(data)
      .then(() => {
        commit('$mutationAddStudent', data)
      })
      .catch(e => {
        console.error(e)
      })
  },

  $actionEditStudent ({ commit }, data) {
    return editStudent(data)
      .then(() => {
        commit('$mutationEditStudent', data)
      })
      .catch(e => {
        console.error(e)
      })
  },

  $actionDeleteStudent ({ commit }, data) {
    return deleteStudent(data)
      .then(() => {
        commit('$mutationDeleteStudent', data)
      })
      .catch(e => {
        console.error(e)
      })
  },

  $actionClearStudents ({ commit }) {
    commit('$mutationClearStudents')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
