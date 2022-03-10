const database = require('../models');
const {StudentAlreadyExistsError} = require('../errors/errors')
const { Op } = require('sequelize');

class StudentServices {
    async getAllStudents() {
        return database.Student.findAll();
    }

    async getOneStudent(ra) {
        return database.Student.findByPk(ra);
    }

    async createStudent(student) {
        const studentExists = await database.Student.findOne({where: {
            [Op.or]: [
                { email: student.email },
                { cpf: student.cpf }
            ]
        }})
        if (studentExists) {
            throw new StudentAlreadyExistsError('CPF or E-mail already registered', 400)
        }
        return database.Student.create(student);
    }

    async updateStudent(studentDataToUpdate, ra) {
        return database.Student.update(studentDataToUpdate, { where: { ra: ra } });
    }

    async deleteStudent(ra) {
        return database.Student.destroy({where: { ra: ra } });
    }
}

module.exports = StudentServices;