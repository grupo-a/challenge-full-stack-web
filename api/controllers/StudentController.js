const StudentServices = require('../services/StudentServices')
const studentServices = new StudentServices();

class StudentsController {
    static async getAllStudents(req, res) {
        try {
            const allStudents = await studentServices.getAllStudents();
            return res.status(200).json(allStudents);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = StudentsController;