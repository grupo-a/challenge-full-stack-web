const { Router } = require('express');
const StudentsController = require('../controllers/StudentsController');

const router = Router();

router.get('/students', StudentsController.allStudents);

module.exports = router;