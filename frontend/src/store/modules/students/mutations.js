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

export default mutations