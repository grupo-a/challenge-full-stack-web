'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    static associate(models) {}
  }
  
  Students.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'E-mail inválido!'
        }
      }
    },
    ra: DataTypes.INTEGER,
    cpf: {
      type: DataTypes.INTEGER,
      min: 11,
      max: 11
    }
  }, {
    sequelize,
    modelName: 'Students',
  });
  return Students;
};