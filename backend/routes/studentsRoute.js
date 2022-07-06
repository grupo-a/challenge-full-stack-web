const StudentsController = require('../controllers/StudentsController');

const { Router } = require('express');
const router = Router();

router.get('/students', StudentsController.allStudents)
router.get('/students/one/:id', StudentsController.catchOneStudent)
router.get('/students/name/:name', StudentsController.findStudentsByName)
router.post('/students/form', StudentsController.createStudent)
router.put('/students/form/:id', StudentsController.updateStudent)
router.delete('/students/:id', StudentsController.deleteStudent);

module.exports = router;