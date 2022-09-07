import { StudentServiceMock } from '../../../../application/service/mocks/StudentServiceMock'
import { studentMock } from '../../../../domain/infraestructure/mocks/studentMock'
import { ServerError } from '../../../errors/ServerError'
import { serverError } from '../../../helpers/HttpHelper'
import { HttpRequest } from '../../../protocols/IHttp'
import { AddStudentController } from '../../student/AddStudentController'

const mockRequest = (): HttpRequest => ({
  body: { ...studentMock },
})

const studentService = new StudentServiceMock()
const addStudentController = new AddStudentController(studentService)

describe('StudentController', () => {
  describe('addStudent()', () => {
    test('should return 200', async () => {
      const data = await addStudentController.handle(mockRequest())
      expect(data.body).toEqual(studentMock)
    })

    test('should return server error', async () => {
      jest.spyOn(studentService, 'add').mockRejectedValueOnce({
        statusCode: 500,
        body: new ServerError(),
      })

      const data = await addStudentController.handle(mockRequest())
      expect(data).toEqual(serverError())
    })
  })
})
