const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool

// retorna todos os cadastros
router.get('/', (req, res, next) =>{
    // res.status(200).send({
    //     messagem: 'Usando o GET dentro da rota de cadastros'
    // })
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query (
            'SELECT * FROM cadastros;',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }
        )
    })
})

// insere um cadastro
router.post('/', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO cadastros (nome, email, ra, cpf) VALUES (?,?,?,?)',
            [req.body.nome, req.body.email, req.body.ra, req.body.cpf],
            (error, resultado, field) => {
                // release para liberar a conexão do callback
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }                

                res.status(201).send({
                    mensagem: 'Cadastro realizado com sucesso!',
                    id_cadastro: resultado.insertId
                })
            }
        )
    })
})

// pegando o ID do http e armazenando na variável
// retornando um cadastro a partir do id
router.get('/:id_cadastro', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query (
            'SELECT * FROM cadastros WHERE id_cadastro = ?;',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }
        )
    })
})

// altera um cadastro
router.patch('/', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE cadastros
                SET nome            = ?,
                    email           = ?,
                    ra              = ?,
                    cpf             = ?
                WHERE id_cadastro   = ?`,
            [
                req.body.nome,
                req.body.email,
                req.body.ra,
                req.body.cpf,
                req.body.id_cadastro
            ],
            (error, resultado, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }  

                res.status(202).send({
                    mensagem: 'Atualização realizada com sucesso!',
                })
            }
        )
    })
})

// deleta um cadastro
router.delete('/', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM cadastros WHERE id_cadastro   = ?`, [req.body.id_cadastro],
            (error, resultado, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }  

                res.status(202).send({
                    mensagem: 'Cadastro excluido com sucesso!',
                })
            }
        )
    })
})

module.exports = router