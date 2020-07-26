const studentModel = require('../models/Student')

class Students {
  getStudents (enrollment_id) {
    return new Promise((resolve, reject) => {
      let query = {}

      if (enrollment_id) {
        query.where = { enrollment_id }
      }

      studentModel.findAll(query)
        .then(students => resolve(students))
        .catch(err => reject(err))
      })
  }

  saveStudent (body) {
    return new Promise((resolve, reject) => {
      const data = {
        enrollment_id: body.enrollment_id,
        name: body.name,
        email: body.email,
        cpf: body.cpf
      }

      studentModel.create(data)
        .then(student => resolve(student))
        .catch(err => reject(err))
    })
  }

  editStudent (enrollment_id, body) {
    return new Promise((resolve, reject) => {
      const query = {
        where: { enrollment_id }
      }

      studentModel.update(body, query)
        .then(student => resolve(student))
        .catch(err => reject(err))
    })
  }

  deleteStudent (enrollment_id) {
    return new Promise((resolve, reject) => {
      const query = {
        where: { enrollment_id }
      }

      studentModel.destroy(query)
        .then(student => resolve(student))
        .catch(err => reject(err))
    })
  }
}

module.exports = new Students()