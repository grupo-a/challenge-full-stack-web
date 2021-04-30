const express = require('express');
const router = express.Router();
const controller = require('./controllers/StudentsController')

// STUDENTS' ROUTES
router.insert('/', controller.insert);
router.getAll('/', controller.getAll);
router.update('/:id', controller.update);
router.delete('/:id', controller.delete);


module.exports = router;