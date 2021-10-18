var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var connection = require('./mysql');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// DISABLE CORS ERROR
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// GET ALL STUDENTS
app.get('/students', function (req, res) {
  connection.query("SELECT * FROM student",
    (err, rows, fields) => {
      if (!err)
        res.send(rows)
      else
        console.log(JSON.stringify(err));
    })
})

// GET A STUDENT
app.get('/students/:id', function (req, res) {
  connection.query("SELECT * FROM student WHERE id = ?", [req.params.id],
    (err, rows, fields) => {
      if (!err)
        res.send(rows)
      else
        console.log(JSON.stringify(err));
    })
})

// INSERT A STUDENT
app.post('/students', function (req, res) {
  connection.query(
    "INSERT INTO student (name, document, registration, email) VALUES (?,?,?,?)",
    [req.body.name, req.body.document, req.body.registration, req.body.email],
    (err, rows, fields) => {
      if (!err)
        res.send({ msg: 'Estudante matriculado com sucesso!' })
      else
        console.log(JSON.stringify(err));
    })
})

app.put('/students/:id', function (req, res) {
  connection.query(
    `UPDATE student 
    SET name = ?, document = ?, registration = ?, email = ? 
    WHERE id = ?`,
    [req.body.name, req.body.document, req.body.registration, req.body.email, req.body.id],
    (err, rows, fields) => {
      if (!err)
        res.send({ msg: 'Estudante atualizado com sucesso!' })
      else
        console.log(JSON.stringify(err));
    })
})


// DELETE A STUDENT
app.delete('/students/:id', function (req, res) {
  connection.query('DELETE FROM student WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send({ msg: 'Estudante removido com sucesso.' })
    else
      console.log(JSON.stringify(err));
  })
})

app.listen(3000);

module.exports = app;
