const studentService = require('../services/studentService');

class StudentController {
  async getAll(req, res) {
    try {
      const { pageSize = 10, offSet = 0, name } = req.query;
      const students = await studentService.getAllStudents({
        pageSize: parseInt(pageSize),
        offSet: parseInt(offSet),
        name
      });
      res.status(200).json(students);
    } catch (error) {
      res.status(400).json({
        code: error.code,
        cause: error.message,
        message: `Erro ao retornar usuários.`,
      });
    }
  }
}

module.exports = new StudentController();
