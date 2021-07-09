const ConexaoMySQL = require('../../../database/mysqlConnection')
const { updateSQL } = require('../../../shared/utils/queryBuilder')

class StudentModel {

    /** @type {ConexaoMySQL} */
    constructor(conexao) {
        this.conexao = new ConexaoMySQL()
    }

    indexStudents = async () => {
        let sql = `select * from estudantes`

        return this.conexao.query(sql)
    }

    showStudent = async (id_estudante) => {
        let sql = `select * from estudantes
                    where id_estudante = ${id_estudante}`

        return this.conexao.query(sql)
    }

    storeStudent = async (nome, email, cpf) => {
        let sql = `insert into estudantes (nome, email, cpf)
                    values ('${nome}','${email}','${cpf}')`
        return this.conexao.query(sql)
    }

    updateStudent = async (param) => {
        let sql = updateSQL('estudantes', param, { id_estudante: param.id_estudante })
        return this.conexao.query(sql)
    }

    destroyStudent = async (id_estudante) => {
        let sql = `delete from estudantes where id_estudante = ${id_estudante}`
        return this.conexao.query(sql)
    }

}

module.exports = StudentModel