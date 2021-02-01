const express = require('express')
const router = express.Router()

//Call validation middlewares
const { validateStudentInsert, validateStudentUpdate } = require('../app/middlewares/validate')

//Get controller instance
const StudentController = require('../app/controllers/StudentController')

//List students
router.get('/', StudentController.list)

//Get Student
router.get('/:id', StudentController.get)

//Create student
router.post('/create', validateStudentInsert, StudentController.create)

//Edit student
router.post('/edit', validateStudentUpdate, StudentController.edit)

//Delete student
router.post('/delete', StudentController.delete)

module.exports = router