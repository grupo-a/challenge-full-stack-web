const AppError = require('../shared/errors/AppError');
const CPFvalidator = require('../shared/utils/CPFvalidator');

module.exports = {
  validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  },

  inputValidator(data, next) {
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

    if (!this.validateEmail(email)) {
      throw new AppError('Favor informar um e-mail váildo.', 400);
    }

    if (!CPF) {
      throw new AppError('Favor informar o campo CPF.', 400);
    }

    if (!CPFvalidator(CPF)) {
      throw new AppError('Favor informar um CPF válido.', 400);
    }
  },
};
