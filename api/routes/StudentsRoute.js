const { Router } = require('express')
const StudentController = require('../controllers/StudentController')

const router = Router()

router.get('/students', StudentController.getAllStudents)

module.exports = router