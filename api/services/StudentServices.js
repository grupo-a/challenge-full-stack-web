const database = require('../models');
const {DuplicatedInfoError, StudentNotFoundError, ValidationError} = require('../errors/errors')
const { Op } = require('sequelize');
const { Sequelize } = require('../models');

class StudentServices {

    async getAllStudents() {
        return database.Student.findAll();
    }

    async getOneStudent(ra) {
        return database.Student.findByPk(ra);
    }

    async createStudent(student) {
        try {
            return await database.Student.create(student);
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                throw new DuplicatedInfoError(error.errors[0].message);
            }
            if (error instanceof Sequelize.ValidationError) {
                throw new ValidationError(error.errors[0].message)
            }
            return(error)
        }
        
    }

    async updateStudent(studentDataToUpdate, ra) {
        return database.Student.update(studentDataToUpdate, { where: { ra: ra } });
    }

    async deleteStudent(ra) {
        const studentExists = await database.Student.findByPk(ra);
        if(!studentExists) {
            throw new StudentNotFoundError();
        }
        return await database.Student.destroy({where: { ra: ra } });
    }
}

module.exports = StudentServices;