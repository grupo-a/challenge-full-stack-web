const StudentServices = require('../services/StudentServices');
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

    static async getOneStudent(req, res) {
        try {
            const {ra} = req.params;
            const student = await studentServices.getOneStudent(Number(ra));
            return res.status(200).json(student);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = StudentsController;