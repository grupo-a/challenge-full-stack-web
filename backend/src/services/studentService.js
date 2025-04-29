const studentRepository = require('../repositories/studentRepository');

class StudentService {
  async getAllStudents() {
    try {
      const students = await studentRepository.getAll();
      return students;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
}

module.exports = new StudentService();
