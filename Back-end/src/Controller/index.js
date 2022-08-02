const service = require('../Service');

const getAll = async (req, res) => {
  console.log('controller');
  const data = await service.getAll();

  return res.status(200).json(data);
};

module.exports = {
  getAll,
};
