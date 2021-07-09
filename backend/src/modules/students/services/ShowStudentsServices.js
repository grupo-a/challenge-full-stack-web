const StudentModel = require("../models/StudentModel")

class ShowStudentsService {

    /* único método público a ser implementado*/
    async execute(id_estudante) {

        let studentModel = new StudentModel()

        return studentModel.showStudent(id_estudante)

    }

}

module.exports = ShowStudentsService