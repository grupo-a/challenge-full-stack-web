const students = require('./Students');

const init = (expressionInstance, basePath) => {
    students.init(expressionInstance, basePath)
}

module.exports = {
    init
}