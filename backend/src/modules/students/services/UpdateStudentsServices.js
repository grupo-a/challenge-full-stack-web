const StudentModel = require("../models/StudentModel")

class UpdateStudentsService {

    /* único método público a ser implementado*/
    async execute(param) {

        let studentModel = new StudentModel()

        return studentModel.updateStudent(param)

    }

}

module.exports = UpdateStudentsService