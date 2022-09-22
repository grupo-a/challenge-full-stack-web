import jwt from 'jsonwebtoken'
import { compareHash } from '../../utils/hashBcrypt.js'
import {
  notFound,
  responseForbidden,
  responseOk,
  responseInternalServerError
} from '../../utils/restResponse.js'
import logger from '../../config/logger.js'
import ManagerService from '../../services/Managers.js'
import postgresConnection from '../../config/database/postgres/postgres.js'
import authenticationPostValidator from './validators/authenticationPostValidator.js'

export default async (req, res) => {
  try {
    authenticationPostValidator.parse(req.body)

    const managerService = new ManagerService(postgresConnection)

    const user = await managerService.getManagerByEmail(req.body.email)

    if (!user) return notFound(res, 'email not found')

    const correctPass = await compareHash(req.body.password, user.password)

    if (!correctPass) return responseForbidden(res, 'invalid password')

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
    return responseInternalServerError(res)
  }
}
