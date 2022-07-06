const students = require('./studentsRoute');
const login = require('./loginRoute');

const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app => {
    app.use(cors())
    app.use(bodyParser.json())
    app.use(students)
    app.use(login)
}