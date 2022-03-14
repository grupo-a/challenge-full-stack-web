const StudentServices = require('../services/StudentServices');
const { paginationBuilder } = require('../utils/paginationBuilder');
const studentServices = new StudentServices();

class StudentsController {
    static async getAllStudents(req, res, next) {
        try {
            const pageAsNumber = Number.parseInt(req.query.page);
            const sizeAsNumber = Number.parseInt(req.query.size);
            const pagination = paginationBuilder(req.query.orderBy, pageAsNumber, sizeAsNumber, req.query.order);
            const allStudents = await studentServices.getAllStudents([[pagination.orderBy, pagination.order]], pagination.page, pagination.size);
            console.log(allStudents);
            return res.status(200).json({
                totalStudents: allStudents.count,
                currentPage: pagination.page,
                content: allStudents.rows,
                totalPages: Math.ceil(allStudents.count / pagination.size),
                orderBy: pagination.orderBy,
                order: pagination.order
            });
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