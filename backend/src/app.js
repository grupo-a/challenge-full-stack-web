const express = require('express');
const app = express();

const routes = require('./routes');
const basePath = '/v1';

routes.init(app, basePath);

module.exports = app;
