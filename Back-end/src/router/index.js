const { Router } = require('express');
const controller = require('../Controller');

const route = Router();

route.get('/', controller.getAll);

module.exports = route;
