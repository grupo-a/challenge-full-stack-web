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

const updateStudent = async (req, res, next) => {
  const {
    id, name, email,
  } = req.body;

  const registeringUpdate = await service.updateStudent(id, name, email);
  if (registeringUpdate.error) return next(registeringUpdate);

  return res.status(201).json(registeringUpdate);
};

const removeStudent = async (req, res, next) => {
  const { id } = req.params;
  const delStudent = await service.removeStudent(+id);

  if (delStudent.error) return next(delStudent);

  return res.status(200).json(delStudent);
};

module.exports = {
  getAll,
  registerStudent,
  updateStudent,
  removeStudent,
};
