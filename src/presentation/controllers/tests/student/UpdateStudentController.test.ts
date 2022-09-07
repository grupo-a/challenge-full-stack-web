import { StudentServiceMock } from '../../../../application/service/mocks/StudentServiceMock'
import { studentMock } from '../../../../domain/infraestructure/mocks/studentMock'
import { ServerError } from '../../../errors/ServerError'
import { serverError } from '../../../helpers/HttpHelper'
import { HttpRequest } from '../../../protocols/IHttp'
import { UpdateStudentController } from '../../student/UpdateStudentController'

const mockRequest = (): HttpRequest => ({
  body: { ...studentMock },
})

const studentService = new StudentServiceMock()
const updateStudentController = new UpdateStudentController(studentService)

describe('StudentController', () => {
  describe('updateStudent()', () => {
    test('should return 200', async () => {
      const data = await updateStudentController.handle(mockRequest())
      expect(data.body).toEqual(studentMock)
    })

    test('should return server error', async () => {
      jest.spyOn(studentService, 'update').mockRejectedValueOnce({
        statusCode: 500,
        body: new ServerError(),
      })

      const data = await updateStudentController.handle(mockRequest())
      expect(data).toEqual(serverError())
    })
  })
})
