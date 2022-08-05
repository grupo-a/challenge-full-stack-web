const { Router } = require('express');
const controller = require('../Controller');

const route = Router();

route.get('/', controller.getAll);
route.post('/', controller.registerStudent);
route.put('/', controller.updateStudent);
route.delete('/:id', controller.removeStudent);

module.exports = route;
