const database = require('../models');
const {StudentNotFoundError} = require('../errors/errors');

class StudentServices {

    async getAllStudents(order, page, size) {
        const req_limit = size;
        const req_offset = size * page;
        return database.Student.findAndCountAll({order: order, limit: req_limit, offset: req_offset});
    }

    async getOneStudent(ra) {
        const student = await database.Student.findByPk(ra);
        if (!student) {
            throw new StudentNotFoundError();
        }
        return student;
    }

    async createStudent(student) {
        return database.Student.create(student);
    }

    async updateStudent(studentDataToUpdate, ra) {
        delete studentDataToUpdate.cpf;
        delete studentDataToUpdate.ra;
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