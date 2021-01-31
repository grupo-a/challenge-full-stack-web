const Sequelize = require('sequelize')
const database = require('../config/database/setup')

const Student = database.define('student', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ra: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    cpf: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    }
})