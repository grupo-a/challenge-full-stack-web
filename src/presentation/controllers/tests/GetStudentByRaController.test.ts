import { StudentServiceMock } from '../../../application/service/mocks/StudentServiceMock'
import { studentMock } from '../../../domain/infraestructure/mocks/studentMock'
import { ServerError } from '../../errors/ServerError'
import { serverError } from '../../helpers/HttpHelper'
import { HttpRequest } from '../../protocols/IHttp'
import { GetStudentByRaController } from '../GetStudentByRaController'

const mockRequest = (): HttpRequest => ({
  params: studentMock.ra,
})

const studentService = new StudentServiceMock()
const getStudentByRaController = new GetStudentByRaController(studentService)

describe('StudentController', () => {
  describe('getStudentByRa()', () => {
    test('should return 200', async () => {
      const data = await getStudentByRaController.handle(mockRequest())
      expect(data.body).toEqual(studentMock)
    })

    test('should return server error', async () => {
      jest.spyOn(studentService, 'getByRa').mockRejectedValueOnce({
        statusCode: 500,
        body: new ServerError(),
      })

      const data = await getStudentByRaController.handle(mockRequest())
      expect(data).toEqual(serverError())
    })
  })
})
