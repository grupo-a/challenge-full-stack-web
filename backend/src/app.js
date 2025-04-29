const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const studentRoutes = require('./routes/studentRoutes');

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use('/api/v1', studentRoutes);


module.exports = app;