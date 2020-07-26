import {
  getStudents,
  saveStudent,
  editStudent,
  deleteStudent
} from '@/api/students'

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

export default actions