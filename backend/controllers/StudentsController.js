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

    static async catchOneStudent(req, res) {
        const { id } = req.params;

        try {
            const oneStudent = await database.Students.findOne({
                where: { 
                    id: Number(id)
                }
            });

            return res.status(200).json(oneStudent);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async createStudent(req, res) {
        const newStudent = req.body;

        try {
            const newStudentCreated = await database.Students.create(newStudent);

            return res.status(200).json(newStudentCreated);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = StudentsController;