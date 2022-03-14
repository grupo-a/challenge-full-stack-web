const StudentServices = require('../services/StudentServices');
const studentServices = new StudentServices();

class StudentsController {
    static async getAllStudents(req, res, next) {
        try {
            const allStudents = await studentServices.getAllStudents();
            return res.status(200).json(allStudents);
        } catch (error) {
            next(error);
        }
    }

    static async getOneStudent(req, res, next) {
        try {
            const {ra} = req.params;
            const student = await studentServices.getOneStudent(Number(ra));
            return res.status(200).json(student);
        } catch (error) {
            next(error)
        }
    }

    static async createStudent(req, res, next) {
        try {
            const newStudent = req.body;
            const createdStudent = await studentServices.createStudent(newStudent);
            res.status(201).json(createdStudent);
        } catch (error) {
            next(error)
        }
    }

    static async updateStudent(req, res, next) {
        try {
            const { ra } = req.params;
            const studentDataToUpdate = req.body;
            await studentServices.updateStudent(studentDataToUpdate, Number(ra));
            const updatedStudent = await studentServices.getOneStudent(Number(ra));
            return res.status(200).json(updatedStudent);
        } catch (error) {
            next(error)
        }
    }

    static async deleteStudent(req, res, next) {
        try {
            const { ra } = req.params;
            await studentServices.deleteStudent(Number(ra));
            return res.status(200).json({message: `student ${ra} deleted`});
        } catch (error) {
            next(error)
        }
    }
}

module.exports = StudentsController;