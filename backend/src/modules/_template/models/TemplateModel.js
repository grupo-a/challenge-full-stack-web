const ConexaoMySQL = require('../../../database/mysqlConnection')

class TemplateModel {

    /** @type {ConexaoMySQL} */
    constructor(conexao) {
        this.conexao = new ConexaoMySQL()
    }

    getTeste = async () => {
        let sql = `select * from estudantes`

        return this.conexao.query(sql)
    }

}

module.exports = TemplateModel