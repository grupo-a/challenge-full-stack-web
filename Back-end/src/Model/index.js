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
  const checkingStudent = await User.findOne({ where: { cpf } });
  if (checkingStudent) return { error: 400, message: 'existing student' };

  const registered = await User.create({
    ra, name, cpf, email,
  });

  return registered;
};

const updateStudent = async (id, ra, name, cpf, email) => {
  const checking = await findStudent(id);
  if (checking == null) return { error: 400, message: 'Student not exist' };

  const registeringUpdate = await User.update({
    ra, name, cpf, email,
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
