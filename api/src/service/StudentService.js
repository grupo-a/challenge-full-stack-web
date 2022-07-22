const { Student } = require('../db/models');
const AppError = require('../shared/errors/AppError');
const validateStudentInput = require('../shared/utils/validateStudentInput');

module.exports = {
  async listStudents() {
    const students = await Student.findAll();
    return students;
  },

  async findStudent(id) {
    const student = await Student.findOne({ where: { id } });
    if (!student) {
      throw new AppError('Aluno não encontrado.', 404);
    }
    return student;
  },

  async createStudent(inputData) {
    validateStudentInput(inputData);

    const student = await Student.create(inputData);

    return student;
  },

  async updateStudent(id, inputData) {
    const student = await Student.findOne({ where: { id: id } });

    if (!student) {
      throw new AppError('Aluno não encontrado.', 404);
    }

    inputData.RA = student.RA;
    inputData.CPF = student.CPF;
    validateStudentInput(inputData);

    student.name = inputData.name;
    student.email = inputData.email;
    await student.save({ fields: ['name', 'email'] });
  },

  async removeStudent(id) {
    const student = await Student.findOne({ where: { id: id } });

    if (!student) {
      throw new AppError('Aluno não encontrado.', 404);
    }

    await student.destroy({ where: { id } });
  },
};
