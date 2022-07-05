const bodyParser = require('body-parser');
const students = require('./studentsRoute');
const cors = require('cors');

module.exports = app => {
    app
        .use(cors())
        .use(bodyParser.json())
        .use(students)
}