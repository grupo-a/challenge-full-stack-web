import logger from '../../config/logger.js'
import StudentService from '../../services/Students.js'
import postgresConnection from '../../config/database/postgres/postgres.js'
import {
  responseOk,
  responseInternalServerError
} from '../../utils/restResponse.js'
import studentGetListValidator from './validators/studentGetListValidator.js'

export default async (req, res) => {
  try {
    studentGetListValidator.parse(req.query)
    const studentService = new StudentService(postgresConnection)

    const student = await studentService.listStudents(
      req.query.limit,
      req.query.skip
    )

    return responseOk(res, student)
  } catch (e) {
    logger.error(e)
    return responseInternalServerError(res)
  }
}
