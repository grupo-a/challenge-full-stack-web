import logger from '../../config/logger.js'
import StudentService from '../../services/Students.js'
import postgresConnection from '../../config/database/postgres/postgres.js'
import {
  responseOk,
  responseInternalServerError
} from '../../utils/restResponse.js'

export default async (req, res) => {
  try {
    const studentService = new StudentService(postgresConnection)

    const student = await studentService.deleteStudent(req.params.id)

    return responseOk(res, student)
  } catch (e) {
    logger.error(e)
    return responseInternalServerError(res)
  }
}
