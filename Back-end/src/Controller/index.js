const service = require('../Service');

const getAll = async (_req, res) => {
  const data = await service.getAll();

  return res.status(200).json(data);
};

const registerStudent = async (req, res, next) => {
  const {
    ra, name, cpf, email,
  } = req.body;

  const registered = await service.registerStudent(ra, name, cpf, email);

  if (registered.error) return next(registered);

  return res.status(201).json(registered);
};

module.exports = {
  getAll,
  registerStudent,
};
