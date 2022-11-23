import authenticationPost from '../../../../src/controllers/authentication/authenticationPost'

import {
  authenticationPostDepOk,
  authenticationPostDepFail,
  authenticationPostReqOk,
  authenticationPostReqFail
} from '../../../mocks/index.mock.js'

import { jest } from '@jest/globals'

afterEach(() => {
  jest.clearAllMocks()
})

describe('authenticationPost', () => {
  it('should authenticate a user', async () => {
    const authenticationPostController = authenticationPost(authenticationPostDepOk)
    await authenticationPostController(authenticationPostReqOk, {})
    expect(authenticationPostDepOk.mountRequest).toHaveBeenCalledWith(authenticationPostReqOk)
    expect(authenticationPostDepOk.mountRequest).toBeCalledTimes(1)
    expect(authenticationPostDepOk.validator).toBeCalledTimes(1)
    expect(authenticationPostDepOk.databaseCall).toBeCalledTimes(1)
    expect(authenticationPostDepOk.compareHash).toBeCalledTimes(1)
    expect(authenticationPostDepOk.createToken).toBeCalledTimes(1)
    expect(authenticationPostDepOk.responseOk).toBeCalledTimes(1)
    expect(authenticationPostDepOk.logger).not.toBeCalled()
    expect(authenticationPostDepOk.errorHandler).not.toBeCalled()
  })

  it('should fail to authenticate a user', async () => {
    const authenticationPostController = authenticationPost(authenticationPostDepFail)
    await authenticationPostController(authenticationPostReqFail, {})
    expect(authenticationPostDepFail.mountRequest).toHaveBeenCalledWith(authenticationPostReqFail)
    expect(authenticationPostDepFail.mountRequest).toBeCalledTimes(1)
    expect(authenticationPostDepFail.validator).toBeCalledTimes(1)
    expect(authenticationPostDepFail.databaseCall).toBeCalledTimes(1)
    expect(authenticationPostDepFail.compareHash).not.toBeCalled()
    expect(authenticationPostDepFail.createToken).not.toBeCalled()
    expect(authenticationPostDepFail.responseOk).not.toBeCalled()
    expect(authenticationPostDepFail.logger).toBeCalledTimes(1)
    expect(authenticationPostDepFail.errorHandler).toBeCalledTimes(1)
    expect(authenticationPostDepFail.errorHandler).toHaveBeenCalledWith(new Error('Error'), {})
  })
})
