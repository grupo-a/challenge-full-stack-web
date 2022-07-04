const database = require('../models')

class StudentsController {
    static async allStudents(req, res) {
        try {
            const allStudents = await database.Students.findAll();

            return res.status(200).json(allStudents);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = StudentsController;