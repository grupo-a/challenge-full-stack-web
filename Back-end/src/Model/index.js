const { User } = require('../../models/index');

const getAll = async () => {
  console.log('model');

  const data = await User.findAll();

  return data;
};

module.exports = {
  getAll,
};
