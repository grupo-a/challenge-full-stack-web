const model = require('../Model');

const getAll = async () => {
  console.log('Service');

  const data = await model.getAll();
  return data;
};

module.exports = {
  getAll,
};
