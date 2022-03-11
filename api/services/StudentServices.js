const database = require('../models');
const {StudentNotFoundError} = require('../errors/errors');
const { errorHandler } = require("../errors/errorHandler");

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
            errorHandler(error);
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