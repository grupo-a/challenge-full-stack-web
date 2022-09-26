import studentGeneric from '../../../../src/controllers/students/studentGeneric'
import {
  studentGenericDepOk,
  studentGenericDepFail,
  studentGenericReq
} from '../../../mocks/index.mock.js'
import { jest } from '@jest/globals'

afterEach(() => {
  jest.clearAllMocks()
})
describe('studentGeneric', () => {
  describe('StudentPost', () => {
    it('should successfully execute generic controller', async () => {
      const studentCreateController = studentGeneric(studentGenericDepOk)
      await studentCreateController(studentGenericReq, {})
      expect(studentGenericDepOk.mountRequest).toHaveBeenCalledWith(studentGenericReq)
      expect(studentGenericDepOk.mountRequest).toBeCalledTimes(1)
      expect(studentGenericDepOk.validator).toBeCalledTimes(1)
      expect(studentGenericDepOk.databaseCall).toBeCalledTimes(1)
      expect(studentGenericDepOk.responseOk).toHaveBeenCalledWith({}, undefined)
      expect(studentGenericDepOk.responseOk).toBeCalledTimes(1)
      expect(studentGenericDepOk.logger).not.toBeCalled()
      expect(studentGenericDepOk.errorHandler).not.toBeCalled()
    })
    it('should fail to execute controller', async () => {
      const studentCreateController = studentGeneric(studentGenericDepFail)
      await studentCreateController(studentGenericReq, {})
      expect(studentGenericDepFail.mountRequest).toHaveBeenCalledWith(studentGenericReq)
      expect(studentGenericDepFail.mountRequest).toBeCalledTimes(1)
      expect(studentGenericDepFail.validator).toBeCalledTimes(1)
      expect(studentGenericDepFail.databaseCall).toBeCalledTimes(1)
      expect(studentGenericDepFail.responseOk).not.toBeCalled()
      expect(studentGenericDepFail.logger).toBeCalledTimes(1)
      expect(studentGenericDepFail.errorHandler).toBeCalledTimes(1)
      expect(studentGenericDepFail.errorHandler).toHaveBeenCalledWith(new Error('Error'), {})
    })
  })
})
