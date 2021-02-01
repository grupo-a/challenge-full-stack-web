const express = require('express')
const router = express.Router()

//Call validation middlewares
const { validate } = require('../app/middlewares/validate')

//Get controller instance
const StudentController = require('../app/controllers/StudentController')

//List students
router.get('/', StudentController.list)

//Get Student
router.get('/:id', StudentController.get)

//Create student
router.post('/create', validate, StudentController.create)

//Edit student
router.post('/edit', validate, StudentController.edit)

//Delete student
router.post('/:id/delete', StudentController.delete)

module.exports = router