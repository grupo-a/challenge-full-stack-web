const Sequelize = require('sequelize');
const sequelize = new Sequelize('challenge', 'postgres', 'godzilla', { dialect: 'postgres', host: 'db' });

module.exports = sequelize;