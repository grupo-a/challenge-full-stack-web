const express = require('express')
const router = express.Router()

//Call validation middlewares
const { validateStudentInsert, validateStudentUpdate } = require('../app/middlewares/validate')

//Auth Middleware
const auth = require('../app/middlewares/auth')

//Get controller instance
const StudentController = require('../app/controllers/StudentController')

//List students
router.get('/', auth, StudentController.list)

//Get Student
router.get('/:id', auth, StudentController.get)

//Create student
router.post('/create', auth, validateStudentInsert, StudentController.create)

//Edit student
router.post('/edit', auth, validateStudentUpdate, StudentController.edit)

//Delete student
router.post('/delete', auth, StudentController.delete)

module.exports = router