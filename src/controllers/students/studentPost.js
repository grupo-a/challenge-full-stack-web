import logger from '../../config/logger.js'
import studentService from '../../services/students.js'
import postgresConnection from '../../config/database/postgres/postgres.js'
import { responseOk } from '../../utils/restResponse.js'
import studentPostValidator from './validators/studentPostValidator.js'
import { errorHandler } from '../../utils/errorHandler.js'

export default async (req, res) => {
  try {
    studentPostValidator.parse(req.body)
    const studentRepo = studentService(postgresConnection)

    const student = await studentRepo.createStudent(req.body)

    return responseOk(res, student)
  } catch (e) {
    logger.error(e)
    return errorHandler(e, res)
  }
}
