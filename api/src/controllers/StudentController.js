const { Student } = require('../db/models');
const StudentService = require('../service/StudentService');

module.exports = {
  async store(req, res, next) {
    const inputData = req.body;

    try {
      StudentService.inputValidator(inputData, next);

      const student = await Student.create(inputData);

      res.json({ message: 'Aluno cadastrado com sucesso!', data: student });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },
};
