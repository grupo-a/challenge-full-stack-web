const { User } = require('../../models/index');

const getAll = async () => {
  const data = await User.findAll();

  return data;
};

const findStudent = async (id) => {
  const student = await User.findOne({ where: { id } });
  console.log(student);

  return student;
};

const registerStudent = async (ra, name, cpf, email) => {
  const checkingCPF = await User.findOne({ where: { cpf } });
  const checkingRa = await User.findOne({ where: { ra } });
  if (checkingCPF || checkingRa) return { error: 400, message: 'existing student' };

  const registered = await User.create({
    ra, name, cpf, email,
  });

  return registered;
};

const updateStudent = async (id, name, email) => {
  const checking = await findStudent(id);
  if (checking == null) return { error: 400, message: 'Student not exist' };

  const registeringUpdate = await User.update({
    name, email,
  }, {
    where: { id },
  });

  return registeringUpdate;
};

module.exports = {
  getAll,
  registerStudent,
  updateStudent,
};
