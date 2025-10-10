const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Student = database.sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'name'
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        field: 'email'
    },
    ra: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        field: 'ra'
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true,
        field: 'cpf'
    }
}, {
    tableName: 'students',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

module.exports = Student;