const bodyParser = require('body-parser')
const students = require('./StudentsRoute')
const {DuplicatedInfoError} = require('../errors/errors')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(students)
    app.use((error, req, res, next) => {
        if(error instanceof DuplicatedInfoError) {
            return res.status(error.statusCode).json({
                message: error.message
            });
        }
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    })
}