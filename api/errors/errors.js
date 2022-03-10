class StudentAlreadyExistsError extends Error {
    constructor(mensagem, statusCode) {
        super(mensagem);
        this.name = 'StudentAlreadyExistsError';
        this.statusCode = statusCode;
      }
}

module.exports = {StudentAlreadyExistsError};