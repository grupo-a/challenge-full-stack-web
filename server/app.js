var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var connection = require('./mysql');
const { body, validationResult } = require('express-validator');

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
        res.status(400).json({ msg: 'Erro ao receber dados!' })
    })
})

// GET A STUDENT
app.get('/students/:id', function (req, res) {
  connection.query("SELECT * FROM student WHERE id = ?", [req.params.id],
    (err, rows, fields) => {
      if (!err)
        res.send(rows)
      else
        res.status(400).json({ msg: 'Erro ao receber dados!' })
    })
})

// INSERT A STUDENT
app.post('/students', [
  // DATA VALIDATION
  body('email').isEmail().withMessage("E-mail inválido.")
    .custom(async email => {
      const value = await isEmailInUse(email);
      if (value) {
        throw new Error('E-mail já cadastrado!');
      }
    }),
  body('document').isLength({ min: 11, max: 11 }).withMessage("É necessário ter 11 caracteres.")
    .custom(async document => {
      const value = await isDocumentInUse(document);
      if (value) {
        throw new Error('Documento já cadastrado!');
      }
    }),
  body('registration').isLength({ min: 9, max: 9 }).withMessage("É necessário ter 9 caracteres.")
    .custom(async registration => {
      const value = await isRegistrationInUse(registration);
      if (value) {
        throw new Error('RA já cadastrado!');
      }
    }),
], function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  connection.query(
    "INSERT INTO student (name, document, registration, email) VALUES (?,?,?,?)",
    [req.body.name, req.body.document, req.body.registration, req.body.email],
    (err, rows, fields) => {
      if (!err)
        res.send({ msg: 'Estudante matriculado com sucesso!' })
      else
        res.status(400).json({ msg: 'Erro ao matricular o estudante!' })
    })
})

app.put('/students/:id', [
  // DATA VALIDATION
  body('email').isEmail().withMessage("E-mail inválido.")
    .custom(async email => {
      const value = await isEmailInUse(email);
      if (value) {
        throw new Error('E-mail já cadastrado!');
      }
    }),
], function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  connection.query(
    `UPDATE student 
    SET name = ?, email = ? 
    WHERE id = ?`,
    [req.body.name, req.body.email, req.body.id],
    (err, rows, fields) => {
      if (!err)
        res.send({ msg: 'Estudante atualizado com sucesso!' })
      else
        res.status(400).json({ msg: 'Erro ao atualizar o estudante!' })
    })
})


// DELETE A STUDENT
app.delete('/students/:id', function (req, res) {
  connection.query('DELETE FROM student WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send({ msg: 'Estudante removido com sucesso.' })
    else
      res.status(400).json({ msg: 'Erro ao remover o estudante!' })
  })
})

// FUNCTIONS FOR ERROR SUPPORT
function isDocumentInUse(document) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT COUNT(*) AS total FROM student WHERE document = ?', [document], function (error, results, fields) {
      if (!error) {
        return resolve(results[0].total > 0);
      } else {
        return reject(new Error('Erro com a conexão.'));
      }
    }
    );
  });
}

function isEmailInUse(email) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT COUNT(*) AS total FROM student WHERE email = ?', [email], function (error, results, fields) {
      if (!error) {
        return resolve(results[0].total > 0);
      } else {
        return reject(new Error('Erro com a conexão.'));
      }
    }
    );
  });
}

function isRegistrationInUse(registration) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT COUNT(*) AS total FROM student WHERE registration = ?', [registration], function (error, results, fields) {
      if (!error) {
        return resolve(results[0].total > 0);
      } else {
        return reject(new Error('Erro com a conexão.'));
      }
    }
    );
  });
}

app.listen(3000);

module.exports = app;
