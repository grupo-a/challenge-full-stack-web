const error = (err, req, res, next) => {
  console.log('entrou no erro', next);
  return res.status(err.error).json({ message: err.message });
};

module.exports = error;
