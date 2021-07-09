const StudentModel = require("../models/StudentModel")

class StoreStudentsService {

    /* único método público a ser implementado*/
    async execute(nome, email, cpf) {

        let studentModel = new StudentModel()

        return studentModel.storeStudent(nome, email, cpf)

    }

}

module.exports = StoreStudentsService