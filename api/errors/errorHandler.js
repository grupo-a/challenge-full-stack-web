const { Sequelize } = require('../models');
const { DuplicatedInfoError, ValidationError } = require('./errors')

function errorHandler(error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
        throw new DuplicatedInfoError(error.errors[0].message);
    }
    if (error instanceof Sequelize.ValidationError) {
        throw new ValidationError(error.errors[0].message);
    }
}
exports.errorHandler = errorHandler;
