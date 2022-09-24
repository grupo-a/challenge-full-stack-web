import jwt from 'jsonwebtoken'
import { compareHash } from '../../utils/hashBcrypt.js'
import { responseOk } from '../../utils/restResponse.js'
import logger from '../../config/logger.js'
import managerService from '../../services/managers.js'
import postgresConnection from '../../config/database/postgres/postgres.js'
import authenticationPostValidator from './validators/authenticationPostValidator.js'
import { errorHandler, CustomError } from '../../utils/errorHandler.js'

export default async (req, res) => {
  try {
    authenticationPostValidator.parse(req.body)

    const managerRepo = managerService(postgresConnection, CustomError)

    const user = await managerRepo.getManagerByEmail(req.body.email)

    const correctPass = await compareHash(req.body.password, user.password)

    if (!correctPass)
      throw new CustomError('Forbidden', 'password', 'Wrong password')

    const oneHourInMs = Math.floor(Date.now() / 1000) + 60 * 60

    const payload = {
      email: user.email,
      id: user.id,
      type: 'manager',
      exp: oneHourInMs * 24
    }

    const jwtSecret = process.env.JWT_SECRET

    const jwtToken = jwt.sign(payload, jwtSecret)

    responseOk(res, { token: jwtToken, payload })
  } catch (e) {
    logger.error(e)
    return errorHandler(e, res)
  }
}
