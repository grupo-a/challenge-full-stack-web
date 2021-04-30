const express = require('express');
const app = express();
const router = express.Router();

//Rotas
const index = require('./routes/index');
const students = require('./routes/Students');
app.use('/', index);
app.use('/students', students);
module.exports = app;
