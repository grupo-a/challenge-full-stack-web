import { StudentServiceMock } from '../../../../application/service/mocks/StudentServiceMock'
import { studentMock } from '../../../../domain/infraestructure/mocks/studentMock'
import { ServerError } from '../../../errors/ServerError'
import { serverError } from '../../../helpers/HttpHelper'
import { HttpRequest } from '../../../protocols/IHttp'
import { GetStudentsByNameController } from '../../student/GetStudentsByNameController'

const mockRequest = (): HttpRequest => ({
  params: studentMock.nome,
})

const studentService = new StudentServiceMock()
const getStudentsByNameController = new GetStudentsByNameController(studentService)

describe('StudentController', () => {
  describe('getStudentsByName()', () => {
    test('should return 200', async () => {
      const data = await getStudentsByNameController.handle(mockRequest())
      expect(data.body).toEqual([studentMock])
    })

    test('should return server error', async () => {
      jest.spyOn(studentService, 'getByName').mockRejectedValueOnce({
        statusCode: 500,
        body: new ServerError(),
      })

      const data = await getStudentsByNameController.handle(mockRequest())
      expect(data).toEqual(serverError())
    })
  })
})
