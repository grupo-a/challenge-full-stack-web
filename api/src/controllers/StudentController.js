const { Student } = require('../db/models');

module.exports = {
  async store(req, res, next) {
    const { name, email, CPF } = req.body;

    try {
      const student = await Student.create({ name, email, CPF });

      res.json({ message: 'Aluno cadastrado com sucesso!', data: student });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Falha ao registrar usuário' });
    }
  },
};
