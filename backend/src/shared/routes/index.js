const { Router } = require('express');
const templateRouter = require('../../modules/_template/routes/template.routes');

const routes = Router();

routes.use('/template', templateRouter);

module.exports = routes;
