const database = require('../models');

class StudentServices {
    async getAllStudents() {
        return database['Student'].findAll();
    }

    async getOneStudent(ra) {
        return database['Student'].findByPk(ra);
    }

    async createStudent(student) {
        return database['Student'].create(student);
    }

    async updateStudent(studentDataToUpdate, ra) {
        return database['Student'].update(studentDataToUpdate, { where: { ra: ra } })
    }
}

module.exports = StudentServices;