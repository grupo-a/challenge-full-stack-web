const database = require('../models');

class StudentServices {
    async getAllStudents() {
        return database['Student'].findAll();
    }
}

module.exports = StudentServices;