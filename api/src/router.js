const studentModel = require('./models/Student')
const express = require('express')
const router = express.Router()

router.post('/create-student', (req , res) => {
  return new Promise((resolve, reject) => {
    const data = {
      enrollment_id: req.body.enrollment_id,
      name: req.body.name,
      email: req.body.email,
      cpf: req.body.cpf
    }

    studentModel.create(data)
      .then(student => {
        resolve(res.json(student))
      })
      .catch(err => reject(res.json(err)))
  })
})

router.get('/get-student/:enrollment_id?', (req, res) => {
  return new Promise((resolve, reject) => {
    const enrollment_id = req.params.enrollment_id
    let query = {}

    if (enrollment_id) {
      query.where = { enrollment_id }
    }

    studentModel.findAll(query)
      .then(students => {
        resolve(res.json(students))
      })
      .catch(err => reject(new Error(err)))
  })
})

module.exports = router