const { Sequelize } = require('sequelize')

module.exports = (error, req, res, next) => {
    
    if (error instanceof Sequelize.ValidationError) {
        if(error.name === 'SequelizeUniqueConstraintError') {
            error.status = 409;
        }
        if(error.name === 'SequelizeValidationError') {
            error.status = 400;
        }
        error.message = error.errors[0].message;
    }
    const status = error.status || 500;
    res
        .status(status)
        .send(
            {
                message: error.message,
                timestamp: Date.now(),
                path: req.originalUrl
            }
        );
}