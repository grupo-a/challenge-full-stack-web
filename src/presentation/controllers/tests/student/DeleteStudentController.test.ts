import { StudentServiceMock } from '../../../../application/service/mocks/StudentServiceMock'
import { studentMock } from '../../../../domain/infraestructure/mocks/studentMock'
import { ServerError } from '../../../errors/ServerError'
import { serverError } from '../../../helpers/HttpHelper'
import { HttpRequest } from '../../../protocols/IHttp'
import { DeleteStudentController } from '../../student/DeleteStudentController'

const mockRequest = (): HttpRequest => ({
  params: studentMock.ra,
})

const studentService = new StudentServiceMock()
const deleteStudentController = new DeleteStudentController(studentService)

describe('StudentController', () => {
  describe('deleteStudent()', () => {
    test('should return 200', async () => {
      const data = await deleteStudentController.handle(mockRequest())
      expect(data.body).toEqual(studentMock)
    })

    test('should return server error', async () => {
      jest.spyOn(studentService, 'delete').mockRejectedValueOnce({
        statusCode: 500,
        body: new ServerError(),
      })

      const data = await deleteStudentController.handle(mockRequest())
      expect(data).toEqual(serverError())
    })
  })
})
