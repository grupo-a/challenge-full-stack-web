const StudentService = require('../service/StudentService');

module.exports = {
  async index(req, res) {
    try {
      const students = await StudentService.listStudents();
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },

  async show(req, res) {
    const id = parseInt(req.params.id);
    try {
      const student = await StudentService.findStudent(id);
      res.json(student);
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
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

  async update(req, res) {
    const id = parseInt(req.params.id);
    const inputData = req.body;

    try {
      await StudentService.updateStudent(id, inputData);
      res.json({ message: 'Dados do aluno atualizados com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },

  async destroy(req, res) {
    const id = parseInt(req.params.id);

    try {
      await StudentService.removeStudent(id);
      res.json({ message: 'Aluno excluído com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },
};
