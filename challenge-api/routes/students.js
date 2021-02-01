const express = require('express')
const router = express.Router()

//Get controller instance
const StudentController = require('../app/controllers/StudentController')

//List students
router.get('/', StudentController.list)

//Get Student
router.get('/:id', StudentController.get)

//Create student
router.post('/create', StudentController.create)

//Edit student
router.post('/edit', StudentController.edit)

//Delete student
router.post('/:id/delete', StudentController.delete)

module.exports = router