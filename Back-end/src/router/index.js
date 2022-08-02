const { Router } = require('express');
const controller = require('../Controller');

const route = Router();

route.get('/', controller.getAll);
route.post('/', controller.registerStudent);

module.exports = route;
