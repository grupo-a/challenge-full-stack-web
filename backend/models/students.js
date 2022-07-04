'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    static associate(models) {}
  }
  
  Students.init({
    name: {
      type: DataTypes.STRING(150),
      validate: {
        min: 4,
        max: 150
      }
    },
    email: {
      type: DataTypes.STRING(150),
      validate: {
        isEmail: {
          args: true,
          msg: 'E-mail inválido!',
          max: 150
        }
      }
    },
    ra: DataTypes.STRING,
    cpf: {
      type: DataTypes.STRING(11),
      validate: {
        len: 11
      }
    }
  }, {
    sequelize,
    modelName: 'Students',
  });
  return Students;
};