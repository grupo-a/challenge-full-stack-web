const bodyParser = require('body-parser')
const students = require('./StudentsRoute')
const errorHandler = require('../errors/errorHandler')


module.exports = app => {
    app.use(bodyParser.json())
    app.use(students)
    app.use(errorHandler)
}