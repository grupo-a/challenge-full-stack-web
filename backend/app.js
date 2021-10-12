const express = require('express')
const app = express()
const morgan = require('morgan')

const registeredsnRoute = require('./routes/registered')
const studentsRoute = require('./routes/students')
const usersRoute = require('./routes/users')

// o morgan executa um callback para dar proseguimento ao projeto
app.use(morgan('dev'));

// definindo cabeçario
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    // o OPTIONS é muito usado quando implementar frontend para consumir a API
    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).send({});
    }

    next();
})

app.use('/registered', registeredsnRoute)
app.use('/alunos', studentsRoute)
app.use('/usuarios', usersRoute)

// tratamento de erro se não econtrar nenhuma rota
app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada!')
    erro.status = 404;
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            message: error.message
        }
    })
})

module.exports = app;