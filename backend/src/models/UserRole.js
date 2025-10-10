const { DataTypes } = require('sequelize');
const database = require('../config/database');

const UserRole = database.sequelize.define('UserRole', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'roles',
            key: 'id'
        }
    }
}, {
    tableName: 'user_roles',
    timestamps: false
});

module.exports = UserRole;