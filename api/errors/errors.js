class StudentNotFoundError extends Error {
  constructor() {
    super('Student not found');
    this.name = 'Student not Found';
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(`${message}`);
    this.status = 400;
  }
}

module.exports = {StudentNotFoundError, ValidationError};