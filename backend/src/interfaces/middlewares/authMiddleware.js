const jwt = require("jsonwebtoken")
const { UnauthorizedError } = require("../../utils/errors")

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new UnauthorizedError("Token não fornecido")
  }

  const parts = authHeader.split(" ")

  if (parts.length !== 2) {
    throw new UnauthorizedError("Erro no formato do token")
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    throw new UnauthorizedError("Token mal formatado")
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    throw new UnauthorizedError("Token inválido ou expirado")
  }
}

module.exports = authMiddleware
