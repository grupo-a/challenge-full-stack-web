const mysql = require('../mysql').pool

exports.getCadastros = (req, res, next) =>{
    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query (
            'SELECT * FROM cadastros;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    cadastros: result.map(cad => {
                        return {
                            id_cadastro: cad.id_cadastro,
                            nome: cad.nome,
                            email: cad.email,
                            ra: cad.ra,
                            cpf: cad.cpf,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna um cadastrado específico',
                                url: 'http//localhost:3000/cadastros/' + cad.id_cadastro
                            }
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    })
}

exports.postCadastro = (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO cadastros (nome, email, ra, cpf) VALUES (?,?,?,?)',
            [req.body.nome, req.body.email, req.body.ra, req.body.cpf],
            (error, result, field) => {
                // release para liberar a conexão do callback
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }                
                const response = {
                    mensagem: 'Cadastro realizado com sucesso',
                        cadastroCriado : {
                            id_cadastro: result.id_cadastro,
                            nome: req.body.nome,
                            email: req.body.email,
                            ra: req.body.ra,
                            cpf: req.body.cpf,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os cadastros',
                                url: 'http//localhost:3000/cadastros'
                            }
                    }
                }

                return res.status(201).send(response)
            }
        )
    })
}

exports.getUmCadastro = (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query (
            'SELECT * FROM cadastros WHERE id_cadastro = ?;',
            [req.params.id_cadastro],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado cadastro com este ID'
                    })
                }
                const response = {
                    cadastro : {
                        id_cadastro: result[0].id_cadastro,
                        nome: result[0].nome,
                        email: result[0].email,
                        ra: result[0].ra,
                        cpf: result[0].cpf,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os cadastros',
                            url: 'http//localhost:3000/cadastros'
                        }
                    }
                }
                return res.status(200).send({ response: result })
            }
        )
    })
}

exports.updateCadastro = (req, res, next) =>{
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
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }  
                const response = {
                    mensagem: 'Cadastro atualizado com sucesso',
                        cadastroAtualizado : {
                            id_cadastro: req.body.id_cadastro,
                            nome: req.body.nome,
                            email: req.body.email,
                            ra: req.body.ra,
                            cpf: req.body.cpf,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna detalhes de um cadastro específico',
                                url: 'http//localhost:3000/cadastros' + req.body.id_produto
                            }
                    }
                }
                return res.status(202).send(response)
            }
        )
    })
}

exports.deleteCadastro = (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM cadastros WHERE id_cadastro   = ?`, [req.body.id_cadastro],
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }  
                const response = {
                    mensagem: 'Cadastro excluido com sucesso!',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um cadastro',
                        url: 'http://localhost:3000/cadastros',
                        body: {
                            nome: 'String',
                            email: 'String',
                            ra: 'Number',
                            cpf: 'Number'
                        }
                    }
                }
                return res.status(202).send(response)
            }
        )
    })
}