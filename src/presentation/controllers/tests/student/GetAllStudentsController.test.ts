import { StudentServiceMock } from '../../../../application/service/mocks/StudentServiceMock'
import { studentMock } from '../../../../domain/infraestructure/mocks/studentMock'
import { ServerError } from '../../../errors/ServerError'
import { serverError } from '../../../helpers/HttpHelper'
import { HttpRequest } from '../../../protocols/IHttp'
import { GetAllStudentsController } from '../../student/GetAllStudentsController'

const mockRequest = (): HttpRequest => ({
  params: studentMock.nome,
})

const studentService = new StudentServiceMock()
const getAllStudentsController = new GetAllStudentsController(studentService)

describe('StudentController', () => {
  describe('getAllStudents()', () => {
    test('should return 200', async () => {
      const data = await getAllStudentsController.handle(mockRequest())
      expect(data.body).toEqual([studentMock])
    })

    test('should return server error', async () => {
      jest.spyOn(studentService, 'getAll').mockRejectedValueOnce({
        statusCode: 500,
        body: new ServerError(),
      })

      const data = await getAllStudentsController.handle(mockRequest())
      expect(data).toEqual(serverError())
    })
  })
})
