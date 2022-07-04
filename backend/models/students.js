'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    static associate(models) {}
  }
  
  Students.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    ra: DataTypes.INTEGER,
    cpf: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Students',
  });
  return Students;
};