
class DuplicatedInfoError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'Info Already Exists Error';
        this.statusCode = statusCode;
      }
}

class StudentNotFoundError extends Error {
  constructor() {
    super();
    this.name = 'Student not Found';
    this.statusCode = 400;
  }
}

module.exports = {DuplicatedInfoError, StudentNotFoundError};