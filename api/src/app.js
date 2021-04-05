const express = require('express');

const StudentsRoutes = require('./routes/StudentsRoutes');

require('./config/database');

const app = express();

app.use(express.json());
app.use(StudentsRoutes);

module.exports = app;