class DuplicatedInfoError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'Info Already Exists Error';
        this.statusCode = statusCode;
      }
}

module.exports = {DuplicatedInfoError};