const exports = require('express')
const router = express.Router()

// retorna todos os alunos
router.get('/', (req, res, next) =>{
    res.status(200).send({
        messagem: 'Usando o GET dentro da rota de alunos'
    })
})

// insere um aluno
router.post('/', (req, res, next) =>{
    const aluno = {
        id_cadastro: req.body.id_cadastro,
        ra: req.body.ra,
        nome: req.body.nome,
        cpf: req.body.cpf,
        acoes: req.body.acoes
    }
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota de alunos',
        alunoCriado: aluno
    })
})

// pegando o ID do http e armazenando na variável
// retornando um aluno
router.get('/:id_aluno', (req, res, next) =>{
    const id = req.params.id_aluno

    if(id === 'especial') {
        res.status(200).send({
            mensagem: 'Você descobriu o ID especial',
            id: id
        })
    } else {
        res.status(200).send({
            mensagem: 'Você passou o ID'
        })
    }
})

// altera um aluno
router.patch('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando o PATCH dentro da rota de alunos'
    })
})

// deleta um aluno
router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de alunos'
    })
})

module.exports = router