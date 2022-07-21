const AppError = require('../errors/AppError');
const validateEmail = require('./validateEmail');
const validateCPF = require('./validateCPF');

module.exports = function validateStudentInput(data) {
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
};
