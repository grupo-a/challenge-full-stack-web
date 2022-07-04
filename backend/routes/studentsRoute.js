const { Router } = require('express');
const StudentsController = require('../controllers/StudentsController');

const router = Router();

router
    .get('/students', StudentsController.allStudents)
    .get('/students/:id', StudentsController.catchOneStudent)
    .post('/students', StudentsController.createStudent)

module.exports = router;