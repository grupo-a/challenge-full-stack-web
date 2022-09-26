import { errorHandler } from '../../../src/utils/errorHandler'
import {
  errorHandlerDep,
  QueryFailedError,
  queryFailedErrorResponse,
  zodErrorPath,
  zodErrorPathResponse,
  ZodErrorKeys,
  zodErrorKeysResponse,
  notFound,
  notFoundResponse,
  forbidden,
  forbiddenResponse,
  unauthorized,
  unauthorizedNoField,
  unauthorizedResponse,
  notImplementedError,
  notImplementedErrorResponse
} from '../../mocks/index.mock.js'

import { jest } from '@jest/globals'

afterEach(() => {
  jest.clearAllMocks()
})
describe('errorHandler', () => {
  const errorHandlerInstance = errorHandler(errorHandlerDep)
  it('should call QueryFailedError', () => {
    errorHandlerInstance(QueryFailedError, {})
    expect(errorHandlerDep.responseForbidden).toBeCalledTimes(1)
    expect(errorHandlerDep.responseForbidden).toHaveBeenCalledWith(queryFailedErrorResponse, {})
  })

  it('should call ZodError with path', () => {
    errorHandlerInstance(zodErrorPath, {})
    expect(errorHandlerDep.responseBadRequest).toBeCalledTimes(1)
    expect(errorHandlerDep.responseBadRequest).toHaveBeenCalledWith(zodErrorPathResponse, {})
  })
  it('should call ZodError with keys', () => {
    errorHandlerInstance(ZodErrorKeys, {})
    expect(errorHandlerDep.responseBadRequest).toBeCalledTimes(1)
    expect(errorHandlerDep.responseBadRequest).toHaveBeenCalledWith(zodErrorKeysResponse, {})
  })
  it('should call NotFound', () => {
    errorHandlerInstance(notFound, {})
    expect(errorHandlerDep.notFound).toBeCalledTimes(1)
    expect(errorHandlerDep.notFound).toHaveBeenCalledWith(notFoundResponse, {})
  })
  it('should call Forbidden', () => {
    errorHandlerInstance(forbidden, {})
    expect(errorHandlerDep.responseForbidden).toBeCalledTimes(1)
    expect(errorHandlerDep.responseForbidden).toHaveBeenCalledWith(forbiddenResponse, {})
  })
  it('should call Unauthorized', () => {
    errorHandlerInstance(unauthorized, {})
    expect(errorHandlerDep.responseUnauthorized).toBeCalledTimes(1)
    expect(errorHandlerDep.responseUnauthorized).toHaveBeenCalledWith(unauthorizedResponse, {})
  })
  it('should call Unauthorized without field', () => {
    errorHandlerInstance(unauthorizedNoField, {})
    expect(errorHandlerDep.responseUnauthorized).toBeCalledTimes(1)
    expect(errorHandlerDep.responseUnauthorized).toHaveBeenCalledWith(unauthorizedResponse, {})
  })
  it('should call responseInternalServerError', () => {
    errorHandlerInstance(notImplementedError, {})
    expect(errorHandlerDep.responseInternalServerError).toBeCalledTimes(1)
    expect(errorHandlerDep.responseInternalServerError).toHaveBeenCalledWith(
      notImplementedErrorResponse,
      {}
    )
  })
})
