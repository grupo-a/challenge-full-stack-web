const { User } = require('../../models/index');

const getAll = async () => {
  const data = await User.findAll();

  return data;
};

const registerStudent = async (ra, name, cpf, email) => {
  const checkingStudent = await User.findOne({ where: { cpf } });
  if (checkingStudent) return { error: 400, message: 'existing student' };

  const registered = await User.create({
    ra, name, cpf, email,
  });

  return registered;
};

module.exports = {
  getAll,
  registerStudent,
};
