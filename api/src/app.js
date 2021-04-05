const express = require('express');

const StudentsRoutes = require('./routes/StudentsRoutes');

require('./config/database');

const app = express();

app.use(express.json());
app.use(StudentsRoutes);
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500)
  return res.json({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

module.exports = app;