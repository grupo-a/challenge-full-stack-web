const { DataTypes } = require('sequelize');
const database = require('../config/database');
const User = require('./User');
const UserRole = require('./UserRole');

const Role = database.sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'roles',
    timestamps: false
});

// Associação já definida no User.js

module.exports = Role;