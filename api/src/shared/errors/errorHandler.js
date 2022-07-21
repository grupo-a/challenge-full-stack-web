const AppError = require('./AppError');
function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'erro',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'erro',
    message: 'Internal server error',
  });
}

module.exports = errorHandler;
