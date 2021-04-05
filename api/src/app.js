const express = require('express');
var errorHandler = require('strong-error-handler');

const StudentsRoutes = require('./routes/StudentsRoutes');

require('./config/database');

const app = express();

app.use(express.json());
app.use(errorHandler({
  debug: process.env.ENV === 'development' || process.env.ENV === 'dev',
  log: true,
}));
app.use(StudentsRoutes);

module.exports = app;