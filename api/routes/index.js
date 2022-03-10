const bodyParser = require('body-parser')
const students = require('./StudentsRoute')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(students)
}