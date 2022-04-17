const {cpf} = require('cpf-cnpj-validator');
const { ValidationError } = require('../errors/errors')
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
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4,50],
          msg: 'Name must have between 4 and 50 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'E-mail already registered'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid e-mail'
        },
        len: {
          args:[5,50],
          msg: 'E-mail must have between 5 and 50 characters'
        }
      }
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'CPF already registered'
      },
      validate: {
        len: {
          args: [11],
          msg: 'CPF must have 11 characters'
        },
        is: {
          args: /^\d{11}$/,
          msg: 'CPF must be numbers only'
        },
        isValidCpf(givenCpf) {
          if (!cpf.isValid(givenCpf)) {
            throw new ValidationError('CPF not valid')
          }
        }
      }
    }, 
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};