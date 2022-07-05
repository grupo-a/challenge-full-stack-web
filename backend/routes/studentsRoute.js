const { Router } = require('express');
const StudentsController = require('../controllers/StudentsController');

const router = Router();

router
    .get('/students', StudentsController.allStudents)
    .get('/students/one/:id', StudentsController.catchOneStudent)
    .get('/students/name/:name', StudentsController.findStudentsByName)
    .post('/students/form', StudentsController.createStudent)
    .put('/students/form/:id', StudentsController.updateStudent)
    .delete('/students/:id', StudentsController.deleteStudent);

module.exports = router;