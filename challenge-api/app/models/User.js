const Sequelize = require('sequelize')
const database = require('../config/database/setup')

const User = database.define('user', {
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
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.INTEGER(100),
        allowNull: false
    }
})

module.exports = User