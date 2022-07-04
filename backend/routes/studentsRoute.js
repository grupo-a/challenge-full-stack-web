const { Router } = require('express');
const StudentsController = require('../controllers/StudentsController');

const router = Router();

router.get('/students', StudentsController.allStudents);
router.get('/students/:id', StudentsController.catchOneStudent);

module.exports = router;