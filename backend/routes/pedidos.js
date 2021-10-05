const exports = require('express')
const router = express.Router()

// retorna todos os pedidos
router.get('/', (req, res, next) =>{
    res.status(200).send({
        messagem: 'Usando o GET dentro da rota de pedidos'
    })
})

// insere um pedido
router.post('/', (req, res, next) =>{
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota de pedidos',
        pedidoCriado: pedido
    })
})

// pegando o ID do http e armazenando na variável
// retornando um pedido
router.get('/:id_pedido', (req, res, next) =>{
    const id = req.params.id_pedido

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

// altera um pedido
router.patch('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando o PATCH dentro da rota de pedidos'
    })
})

// deleta um pedido
router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de pedidos'
    })
})

module.exports = router