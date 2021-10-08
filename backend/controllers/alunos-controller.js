const mysql = require('../mysql').pool

exports.getAlunos = (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query (
            'SELECT * FROM alunos;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    alunos: result.map(aluno => {
                        return {
                            id_aluno: aluno.id_aluno,
                            quantidade: aluno.quantidade,
                            cadastro: {
                                id_cadastro: aluno.id_cadastro,
                                nome: aluno.nome,
                                email: aluno.email,
                                ra: aluno.ra,
                                cpf: aluno.cpf
                            },
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um aluno específico',
                                url: 'http//localhost:3000/alunos/' + aluno.id_aluno
                            }
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    })
}

exports.postAlunos = (req, res, next) =>{

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query('SELECT * FROM cadastros WHERE id_cadastro = ?',
        [req.body.id_cadastro],
        (error, result, field) => {
            if (error) { return res.status(500).send({ error : error })}
            if (result.length === 0) {
                return res.status(404).send({
                    mensagem : 'Não foi encontrado Aluno com esse ID'
                })
            }
            conn.query (
                'INSERT INTO alunos (id_cadastro, quantidade) VALUES (?, ?);',
                [req.body.id_cadastro, req.body.quantidade],
                (error, result, field) => {
                    conn.release();
                    if (error) { return res.status(500).send({ error: error }) }
                    const response = {
                        mensagem: 'Aluno inserido com sucesso',
                        alunoCriado : {
                            id_pedido: result.id_pedido,
                            id_cadastro: req.body.id_produto,
                            quantidade: req.body.quantidade,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os alunos',
                                url: 'http//localhost:3000/alunos'
                            }
                        }
                    }
                    return res.status(200).send(response)
                }
            )
        })
    })
}

exports.getUmAluno = (req, res, next) =>{   
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query (
            'SELECT * FROM alunos WHERE id_aluno = ?;',
            [req.params.id_aluno],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado aluno com este ID'
                    })
                }
                const response = {
                    aluno : {
                        id_aluno: result[0].id_aluno,
                        id_cadastro: result[0].id_cadastro,
                        quantidade: result[0].quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os alunos',
                            url: 'http//localhost:3000/alunos'
                        }
                    }
                }
                return res.status(200).send({ response: result })
            }
        )
    })
}

exports.deletePedido = (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM alunos WHERE id_aluno   = ?`, [req.body.id_aluno],
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }  
                const response = {
                    mensagem: 'Aluno excluído com sucesso!',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um aluno',
                        url: 'http://localhost:3000/alunos',
                        body: {
                            id_produto: 'Number',
                            quantidade: 'Number'
                        }
                    }
                }
                return res.status(202).send(response)
            }
        )
    })
}