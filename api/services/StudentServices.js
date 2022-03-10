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
}

module.exports = StudentServices;