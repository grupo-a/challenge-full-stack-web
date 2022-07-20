import AppError from './AppError.js';
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

export default errorHandler;
