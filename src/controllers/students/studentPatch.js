import logger from '../../config/logger.js'
import studentService from '../../services/students.js'
import postgresConnection from '../../config/database/postgres/postgres.js'
import { responseOk } from '../../utils/restResponse.js'
import studentPatchValidator from './validators/studentPatchValidator.js'
import { errorHandler, CustomError } from '../../utils/errorHandler.js'

export default async (req, res) => {
  try {
    studentPatchValidator.parse(req.body)
    const studentRepo = studentService(postgresConnection, CustomError)

    const student = await studentRepo.updateStudent(req.params.id, req.body)

    return responseOk(res, student)
  } catch (e) {
    logger.error(e)
    return errorHandler(e, res)
  }
}
