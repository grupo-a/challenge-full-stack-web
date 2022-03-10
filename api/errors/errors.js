
class DuplicatedInfoError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Info Already Exists Error';
        this.statusCode = 400;
      }
}

class StudentNotFoundError extends Error {
  constructor() {
    super();
    this.name = 'Student not Found';
    this.statusCode = 400;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = {DuplicatedInfoError, StudentNotFoundError, ValidationError};