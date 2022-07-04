const bodyParser = require('body-parser');
const students = require('./studentsRoute');

module.exports = app => {
    app
        .use(bodyParser.json())
        .use(students)
}