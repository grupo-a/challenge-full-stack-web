const { Router } = require('express');
const studentRouter = require('../../modules/students/routes/student.routes');

const routes = Router();

routes.use('/students', studentRouter);

module.exports = routes;
