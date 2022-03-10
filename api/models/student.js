'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    ra: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4-50],
          msg: 'Name must have between 4 and 50 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid e-mail'
        }
      }
    },
    cpf: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [11],
          msg: 'Invalid CPF'
        }
      }
    }, 
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};