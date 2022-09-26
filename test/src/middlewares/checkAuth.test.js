import checkAuth from '../../../src/middlewares/checkAuth'
import { checkAuthDepOk, checkAuthDepFail, checkAuthHeadersReqOk } from '../../mocks/index.mock.js'
import { CustomError } from '../../../src/utils/errorHandler'
import { jest } from '@jest/globals'

afterEach(() => {
  jest.clearAllMocks()
})
describe('checkAuth', () => {
  const next = jest.fn()
  it('should pass the middleware successfully', () => {
    const middlewareAuth = checkAuth(checkAuthDepOk)('manager')
    middlewareAuth(checkAuthHeadersReqOk, {}, next)
    expect(checkAuthDepOk.mountRequest).toHaveBeenCalledWith(checkAuthHeadersReqOk)
    expect(checkAuthDepOk.mountRequest).toBeCalledTimes(1)
    expect(checkAuthDepOk.validator).toBeCalledTimes(1)
    expect(checkAuthDepOk.verifyToken).toBeCalledTimes(1)
    expect(next).toBeCalledTimes(1)
    expect(checkAuthDepOk.logger).not.toBeCalled()
    expect(checkAuthDepOk.errorHandler).not.toBeCalled()
  })
  it('should fail to pass the middleware', () => {
    const middlewareAuth = checkAuth(checkAuthDepFail)('manager')
    middlewareAuth(checkAuthHeadersReqOk, {}, next)
    expect(checkAuthDepFail.mountRequest).toHaveBeenCalledWith(checkAuthHeadersReqOk)
    expect(checkAuthDepFail.mountRequest).toBeCalledTimes(1)
    expect(checkAuthDepFail.validator).toBeCalledTimes(1)
    expect(checkAuthDepFail.verifyToken).toBeCalledTimes(1)
    expect(next).not.toBeCalled()
    expect(checkAuthDepFail.logger).toBeCalledTimes(1)
    expect(checkAuthDepFail.errorHandler).toBeCalledTimes(1)
    expect(checkAuthDepFail.errorHandler).toHaveBeenCalledWith(
      new CustomError('Unauthorized', 'token', 'Invalid token'),
      {}
    )
  })
})
