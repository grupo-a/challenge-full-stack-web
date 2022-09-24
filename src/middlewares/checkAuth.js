import jwt from 'jsonwebtoken'
import logger from '../config/logger.js'
import checkAuthHeadersValidator from './validators/checkAuthHeadersValidator.js'
import { errorHandler, CustomError } from '../utils/errorHandler.js'

export default (...types) =>
  async (req, res, next) => {
    try {
      checkAuthHeadersValidator.parse(req.headers)
      const [, token] = req.headers.authorization.split(' ')
      const jwtSecret = process.env.JWT_SECRET
      const decodedToken = jwt.verify(token, jwtSecret)
      if (!types.find((type) => decodedToken.type == type))
        throw new CustomError('Unauthorized', 'token', 'Invalid token')
      req.payload = decodedToken
      next()
    } catch (e) {
      logger.error(e)
      return errorHandler(e, res)
    }
  }
