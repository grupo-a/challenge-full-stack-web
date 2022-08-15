const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('../config')
const basename = path.basename(__filename);

let db = {}

const sequelize = new Sequelize(
    config.dataBase.name,
    config.dataBase.user,
    config.dataBase.password,
    {
      host: config.dataBase.host,
      dialect: 'mysql',
      operatorsAliases: 0,
      define: {
        underscored: true,
        freezeTableName: true,
        paranoid: true
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 1000000,
        idle: 50000
      }
    }
  );

  fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;

  module.exports = db;
