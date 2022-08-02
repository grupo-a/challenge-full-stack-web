const service = require('../Service');

const getAll = async (_req, res) => {
  const data = await service.getAll();

  return res.status(200).json(data);
};

const registerStudent = async (req, res) => {
  const {
    ra, name, cpf, email,
  } = req.body;

  const registered = await service.registerStudent(ra, name, cpf, email);

  return res.status(201).json(registered);
};

module.exports = {
  getAll,
  registerStudent,
};
