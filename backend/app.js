const express = require('express')
const app = express()
const morgan = require('morgan')
// const bodyParser = require('body-parser')

const rotaCadastros = require('./routes/cadastros')
const rotaAlunos = require('./routes/alunos')
const rotaUsuarios = require('./routes/usuarios')

// o morgan executa um callback para dar proseguimento ao projeto
app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

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

app.use('/cadastros', rotaCadastros)
app.use('/alunos', rotaAlunos)
app.use('/usuarios', rotaUsuarios)

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
            mensagem: error.message
        }
    })
})

module.exports = app;