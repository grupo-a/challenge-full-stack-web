var express = require('express');
var studentsRoutes = express.Router();

const StudentsController = requite('../controllers/StudentsController');

studentsRoutes.get('/students', StudentsController.index);
studentsRoutes.get('/students/:id', StudentsController.show);
studentsRoutes.post('/students', StudentsController.store);
studentsRoutes.put('/students/:id', StudentsController.update);
studentsRoutes.delete('/students/:id', StudentsController.delete);

module.exports = studentsRoutes;