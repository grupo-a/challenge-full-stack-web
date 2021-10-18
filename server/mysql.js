const mysql = require('mysql')

var connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: '',
  database: 'studentsdb',
  port: 3306
})

connection.connect((err) => {
  if (!err) 
    console.log("BD conectado com sucesso!");
    else
    console.log("Conexão falhou! \n err: ", JSON.stringify(err));
})

module.exports = connection;