const express = require('express')
const router = express.Router()

// retorna todos os produtos
router.get('/', (req, res, next) =>{
    res.status(200).send({
        messagem: 'Usando o GET dentro da rota de produtos'
    })
})

// insere um produto
router.post('/', (req, res, next) =>{
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    }
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota de produtos',
        produtoCriado: produto
    })
})

// pegando o ID do http e armazenando na variável
// retornando um produto a partir do id
router.get('/:id_produto', (req, res, next) =>{
    const id = req.params.id_produto // armazena o id na variável

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

// altera um produto
router.patch('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando o PATCH dentro da rota de produtos'
    })
})

// deleta um produto
router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de produtos'
    })
})

module.exports = router