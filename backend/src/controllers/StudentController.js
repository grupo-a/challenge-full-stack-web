const Student = require('../models/Student');
const studentValidator = require('../validators/studentValidator');

class StudentController {
    async getAllStudents(request, response) {
        try {
            const students = await Student.findAll({
                order: [['created_at', 'DESC']]
            });
            
            return response.json({
                success: true,
                data: students,
                count: students.length
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Error fetching students',
                error: error.message
            });
        }
    }

    async getStudentById(request, response) {
        try {
            const { id } = request.params;
            const student = await Student.findByPk(id);
            
            if (!student) {
                return response.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }
            
            return response.json({
                success: true,
                data: student
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Error fetching student',
                error: error.message
            });
        }
    }

    async createStudent(request, response) {
        try {
            const validation = studentValidator.validateCreate(request.body);
            
            if (validation.error) {
                return response.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: validation.error.details.map(detail => detail.message)
                });
            }

            const student = await Student.create(validation.value);
            
            return response.status(201).json({
                success: true,
                message: 'Student created successfully',
                data: student
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Error creating student',
                error: error.message
            });
        }
    }

    async updateStudent(request, response) {
        try {
            const { id } = request.params;
            
            const validation = studentValidator.validateUpdate(request.body);
            
            if (validation.error) {
                return response.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: validation.error.details.map(detail => detail.message)
                });
            }

            const student = await Student.findByPk(id);
            
            if (!student) {
                return response.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }

            await student.update(validation.value);
            
            return response.json({
                success: true,
                message: 'Student updated successfully',
                data: student
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Error updating student',
                error: error.message
            });
        }
    }

    async deleteStudent(request, response) {
        try {
            const { id } = request.params;
            const student = await Student.findByPk(id);
            
            if (!student) {
                return response.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }

            await student.destroy();
            
            return response.status(204).send();
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Error deleting student',
                error: error.message
            });
        }
    }
}

module.exports = new StudentController();