const model = require('../Model');
const validationStudent = require('../utils/validation');

const getAll = async () => {
  const data = await model.getAll();

  return data;
};

const registerStudent = async (ra, name, cpf, email) => {
  if (Number.isNaN(Number(ra))) {
    return { error: 400, message: 'ra invalido' };
  }

  const valid = validationStudent(ra, name, cpf, email);
  if (valid.error) return valid;

  const registered = await model.registerStudent(ra, name, cpf, email);

  return registered;
};

const updateStudent = async (id, name, email) => {
  if (!id) return { error: 400, message: 'Id is required' };
  const registeringUpdate = await model.updateStudent(id, name, email);

  return registeringUpdate;
};

const removeStudent = async (id) => {
  const delStudent = await model.removeStudent(id);

  return delStudent;
};

module.exports = {
  getAll,
  registerStudent,
  updateStudent,
  removeStudent,
};
