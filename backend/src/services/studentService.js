const studentRepository = require('../repositories/studentRepository');

class StudentService {
  async getAllStudents({ pageSize, offSet, name }) {
    return studentRepository.getAll({ pageSize, offSet, name });
  }
}

module.exports = new StudentService();
