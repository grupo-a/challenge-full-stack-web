const express = require('express')
const cors = require('cors')
const router = express.Router()
const ControllerStudents = require('./controller/Students')

router.all('*', cors())

router.get('/get-students/:enrollment_id?', (req, res) => {
  const enrollment_id = req.params.enrollment_id

  return ControllerStudents.getStudents(enrollment_id)
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

router.post('/save-student', (req , res) => {
  return ControllerStudents.saveStudent(req.body)
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

router.put('/edit-student/:enrollment_id', (req , res) => {
  const enrollment_id = req.params.enrollment_id
  const body = req.body

  return ControllerStudents.editStudent(enrollment_id, body)
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

router.delete('/delete-student/:enrollment_id', (req , res) => {
  const enrollment_id = req.params.enrollment_id

  return ControllerStudents.deleteStudent(enrollment_id)
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

module.exports = router