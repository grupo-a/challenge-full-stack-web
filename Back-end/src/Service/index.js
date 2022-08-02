const model = require('../Model');
const validationStudent = require('../utils/validation');

const getAll = async () => {
  const data = await model.getAll();

  return data;
};

const registerStudent = async (ra, name, cpf, email) => {
  const valid = validationStudent(ra, name, cpf, email);
  if (valid.error) return valid;

  const registered = await model.registerStudent(ra, name, cpf, email);

  return registered;
};

module.exports = {
  getAll,
  registerStudent,
};
