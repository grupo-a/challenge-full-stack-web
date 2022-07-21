const StudentService = require('../service/StudentService');

module.exports = {
  async index(req, res) {
    const students = await StudentService.listStudents();

    res.json(students);
  },
  async store(req, res) {
    const inputData = req.body;

    try {
      const student = await StudentService.createStudent(inputData);

      res.json({ message: 'Aluno cadastrado com sucesso!', data: student });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },
};
