const mysql = require('mysql');

module.exports = class ConexaoMySQL {

    constructor() {
        this.options = {
            connectionLimit: 10,
            host: 'sql10.freemysqlhosting.net',
            user: 'sql10423630',
            password: '3bHssESXb2',
            database: 'sql10423630'
        }

        this.connection = mysql.createPool(this.options)
    }

    query(sql) {
        return new Promise((res, rej) => {
            this.connection.query(sql, (error, results) => {
                if (error)
                    rej(error)
                else
                    res(JSON.parse(JSON.stringify(results)))
            })

        })
    }

}


