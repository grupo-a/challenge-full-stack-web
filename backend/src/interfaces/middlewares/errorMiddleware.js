const { AppError } = require("../../utils/errors")
const logger = require("../../utils/logger")

function errorMiddleware(err, req, res, next) {
  logger.error(`${err.name}: ${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
  })

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      code: err.statusCode,
      message: err.message,
      errors: err.errors,
    })
  }

  return res.status(500).json({
    status: "error",
    code: 500,
    message: "Erro interno do servidor",
  })
}

module.exports = errorMiddleware
