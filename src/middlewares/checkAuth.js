export default (deps) =>
  (...types) =>
  async (req, res, next) => {
    const { logger, verifyToken, mountRequest, validator, errorHandler, CustomError } = deps
    try {
      const payload = mountRequest(req)
      validator(payload)
      const [, token] = req.headers.authorization.split(' ')
      const jwtSecret = process.env.JWT_SECRET
      const decodedToken = verifyToken(token, jwtSecret)
      if (!types.find((type) => decodedToken.type == type))
        throw new CustomError('Unauthorized', 'token', 'Invalid token')
      req.payload = decodedToken
      next()
    } catch (e) {
      logger(e)
      return errorHandler(e, res)
    }
  }
