const { Student } = require('../db/models');
const AppError = require('../shared/errors/AppError');
const validateEmail = require('../shared/utils/validateEmail');
const validateCPF = require('../shared/utils/validateCPF');

module.exports = {
  async listStudents() {
    const students = await Student.findAll();
    return students;
  },
  async createStudent(inputData) {
    this.inputValidator(inputData);

    const student = await Student.create(inputData);

    return student;
  },
  inputValidator(data) {
    const { name, email, CPF } = data;
    if (!name) {
      throw new AppError('Favor informar o campo nome.', 400);
    }

    if (name && name.length > 60) {
      throw new AppError(
        'O campo nome deve ser deve ter no máximo 60 caracteres.',
        400
      );
    }

    if (!email) {
      throw new AppError('Favor informar o campo e-mail.', 400);
    }

    if (!validateEmail(email)) {
      throw new AppError('Favor informar um e-mail váildo.', 400);
    }

    if (!CPF) {
      throw new AppError('Favor informar o campo CPF.', 400);
    }

    if (!validateCPF(CPF)) {
      throw new AppError('Favor informar um CPF válido.', 400);
    }
  },
};
