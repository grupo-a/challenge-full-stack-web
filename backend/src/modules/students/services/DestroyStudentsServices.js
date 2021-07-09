const StudentModel = require("../models/StudentModel")

class DestroyStudentsService {

    /* único método público a ser implementado*/
    async execute(id_estudante) {

        let studentModel = new StudentModel()

        return studentModel.destroyStudent(id_estudante)

    }

}

module.exports = DestroyStudentsService