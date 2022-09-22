import jwt from 'jsonwebtoken'
import { responseUnauthorized } from '../utils/rest.response.js'
import logger from '../config/logger.js'

export default (...types) =>
  async (req, res, next) => {
    try {
      const [, token] = req.headers.authorization.split(' ')
      const jwtSecret = process.env.JWT_SECRET
      const decodedToken = jwt.verify(token, jwtSecret)
      if (!types.find((type) => decodedToken.type == type))
        throw new Error('invalid token for this requisiton')
      req.payload = decodedToken
      next()
    } catch (e) {
      logger.error(e)
      responseUnauthorized(res, 'invalid token for this requisiton')
    }
  }
