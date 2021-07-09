const Joi = require("joi")
const StudentModel = require("../models/StudentModel")

class IndexStudentsService {

    /* único método público a ser implementado*/
    async execute(param) {

        let studentModel = new StudentModel()

        return studentModel.indexStudents()

    }

}

module.exports = IndexStudentsService