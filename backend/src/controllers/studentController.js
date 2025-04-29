const studentService = require('../services/studentService');

class StudentController {
  async getAll(req, res) {
    try {
      const students = await studentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: `${error.message}` });
    }
  }
}

module.exports = new StudentController();
