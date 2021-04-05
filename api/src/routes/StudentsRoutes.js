var express = require('express');
var StudentsRoutes = express.Router();

const StudentsController = require('../controllers/StudentsController');

StudentsRoutes.get('/students', StudentsController.index);
StudentsRoutes.get('/students/:id', StudentsController.show);
StudentsRoutes.post('/students', StudentsController.store);
StudentsRoutes.patch('/students/:id', StudentsController.update);
StudentsRoutes.delete('/students/:id', StudentsController.delete);

module.exports = StudentsRoutes;