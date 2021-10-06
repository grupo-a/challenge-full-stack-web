const express = require('express')
const router = express.Router()

// retorna todos os cadastros
router.get('/', (req, res, next) =>{
    res.status(200).send({
        messagem: 'Usando o GET dentro da rota de cadastros'
    })
})

// insere um cadastro
router.post('/', (req, res, next) =>{
    const cadastro = {
        nome: req.body.nome,
        email: req.body.email,
        ra: req.body.ra,
        cpf: req.body.cpf
    }
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota de cadastros',
        cadastroCriado: cadastro
    })
})

// pegando o ID do http e armazenando na variável
// retornando um cadastro a partir do id
router.get('/:id_cadastro', (req, res, next) =>{
    const id = req.params.id_cadastro // armazena o id na variável

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

// altera um cadastro
router.patch('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando o PATCH dentro da rota de cadastros'
    })
})

// deleta um cadastro
router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de cadastros'
    })
})

module.exports = router