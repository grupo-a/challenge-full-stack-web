import {
  responseOk,
  notFound,
  responseUnauthorized,
  responseForbidden,
  responseBadRequest,
  responseInternalServerError
} from '../../../src/utils/restResponse.js'

import { jest } from '@jest/globals'

describe('restResponse', () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  }
  it('should return status 200', () => {
    responseOk(res, 'data')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith('data')
  })
  it('should return status 404', () => {
    notFound('error', res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith('error')
  })
  it('should return status 401', () => {
    responseUnauthorized('error', res)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.send).toHaveBeenCalledWith('error')
  })
  it('should return status 403', () => {
    responseForbidden('error', res)
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.send).toHaveBeenCalledWith('error')
  })
  it('should return status 400', () => {
    responseBadRequest('error', res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith('error')
  })
  it('should return status 500', () => {
    responseInternalServerError('error', res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith('error')
  })
})
