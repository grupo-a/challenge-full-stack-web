import { jest } from '@jest/globals'
import swaggerJSDoc from 'swagger-jsdoc'
import { CustomError } from '../../src/utils/errorHandler.js'
import express from 'express'

export const studentDeleteValidatorDataOk = {
  id: 'b9f9c9f0-9b9f-4b9f-9c9f-9b9f9c9f9c9f'
}

export const studentDeleteValidatorDataFail = {
  id: 'id'
}

export const studentPatchValidatorDataOk = {
  id: 'b9f9c9f0-9b9f-4b9f-9c9f-9b9f9c9f9c9f',
  name: 'name',
  email: 'email@email.com'
}

export const studentPatchValidatorDataFail = {
  id: 'b9f9c9f0-9b9f-4b9f-9c9f-9b9f9c9f9c9f',
  name: 'name',
  email: 'email'
}

export const studentGetListValidatorDataOk = {
  skip: '0',
  limit: '10'
}

export const studentGetListValidatorDataFail = {
  skip: 1,
  limit: 'many'
}

export const studentPostValidatorDataOk = {
  name: 'name',
  email: 'email@email.com',
  ra: '2342',
  cpf: '05203928339'
}

export const studentPostValidatorDataFail = {
  name: 'name',
  email: 'email',
  cpf: '05203928339',
  ra: '2342'
}

export const authenticationPostDataOk = {
  email: 'email@email.com',
  password: 'password'
}

export const authenticationPostDataFail = {
  email: 'email',
  password: 'password'
}

export const authenticationPostReqOk = {
  body: {
    ...authenticationPostDataOk
  }
}

export const authenticationPostReqFail = {
  body: {
    ...authenticationPostDataFail
  }
}

export const studentGenericReq = {
  body: {
    name: 'Yan Lucas 3',
    email: 'yan@email.com',
    ra: '434179822',
    cpf: '03624283318'
  }
}

export const authenticationPostDepOk = {
  logger: jest.fn(),
  responseOk: jest.fn(),
  errorHandler: jest.fn(),
  validator: jest.fn(),
  databaseCall: jest.fn().mockResolvedValue({}),
  mountRequest: jest.fn().mockReturnValue({}),
  compareHash: jest.fn(),
  createToken: jest.fn()
}

export const authenticationPostDepFail = {
  logger: jest.fn(),
  responseOk: jest.fn(),
  errorHandler: jest.fn(),
  validator: jest.fn(),
  databaseCall: jest.fn().mockRejectedValue(new Error('Error')),
  mountRequest: jest.fn().mockReturnValue({}),
  compareHash: jest.fn(),
  createToken: jest.fn()
}

export const studentGenericDepOk = {
  logger: jest.fn(),
  responseOk: jest.fn(),
  errorHandler: jest.fn(),
  validator: jest.fn(),
  databaseCall: jest.fn(),
  mountRequest: jest.fn()
}

export const studentGenericDepFail = {
  logger: jest.fn(),
  responseOk: jest.fn(),
  errorHandler: jest.fn(),
  validator: jest.fn(),
  databaseCall: jest.fn().mockRejectedValue(new Error('Error')),
  mountRequest: jest.fn()
}

export const swaggerGetDepOk = {
  swagger: swaggerJSDoc,
  responseOk: jest.fn()
}

export const checkAuthHeadersValidatorDataOk = {
  authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsbWFuYWdlckBtYW5hZ2VyLmNvbSIsImlkIjoiM2I0NTBlZTctYjU5Ni00N2YxLTk2MzYtZmRmZGY5YTFiYzg2IiwidHlwZSI6Im1hbmFnZXIiLCJleHAiOjM5OTM2OTgwNjg4LCJpYXQiOjE2NjQwMzcyNjJ9.v23fnBouYV4kFeCJIBjs1Sb6EiJ3Y4heo'
}

export const checkAuthHeadersValidatorDataFail = {
  authorization: 'token'
}

export const checkAuthHeadersReqOk = {
  headers: {
    ...checkAuthHeadersValidatorDataOk
  }
}

export const checkAuthDecodedTokenOk = {
  email: 'emailmanager@manager.com',
  id: '3b450ee7-b596-47f1-9636-fdfdf9a1bc86',
  type: 'manager',
  exp: 39939640872
}

export const checkAuthDecodedTokenFail = {
  email: 'emailmanager@manager.com',
  id: '3b450ee7-b596-47f1-9636-fdfdf9a1bc86',
  type: 'student',
  exp: 39939640872
}

export const checkAuthDepOk = {
  logger: jest.fn(),
  verifyToken: jest.fn().mockReturnValue(checkAuthDecodedTokenOk),
  mountRequest: jest.fn().mockReturnValue(checkAuthHeadersValidatorDataOk),
  validator: jest.fn(),
  errorHandler: jest.fn(),
  CustomError: jest.fn()
}

export const checkAuthDepFail = {
  logger: jest.fn(),
  verifyToken: jest.fn().mockReturnValue(checkAuthDecodedTokenFail),
  mountRequest: jest.fn().mockReturnValue(checkAuthHeadersValidatorDataOk),
  validator: jest.fn(),
  errorHandler: jest.fn(),
  CustomError
}

export const routesDep = {
  express,
  authenticationPostController: jest.fn(),
  studentPostController: jest.fn(),
  studentPatchController: jest.fn(),
  studentGetListController: jest.fn(),
  studentDeleteController: jest.fn(),
  swaggerGetController: jest.fn(),
  checkAuthMiddleware: jest.fn().mockImplementation(() => (req, res, next) => next())
}

export const dbConnectionManagersDepOk = {
  getRepository: jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue({})
  })
}

export const dbConnectionManagersDepFail = {
  getRepository: jest.fn().mockReturnValue({
    findOne: jest.fn().mockReturnValue(null)
  })
}

export const listStudentsQuery = {
  skip: 0,
  limit: 10
}

export const listStudentsReturn = {
  skip: listStudentsQuery.skip,
  limit: listStudentsQuery.limit,
  count: 1,
  data: [studentPostValidatorDataOk]
}

export const updateStudentData = {
  id: '3b450ee7-b596-47f1-9636-fdfdf9a1bc86',
  name: 'name',
  email: 'email@email.com'
}

export const dbConnectionStudentDepOk = {
  getRepository: jest.fn().mockReturnValue({
    save: jest.fn().mockResolvedValue(studentPostValidatorDataOk),
    find: jest.fn().mockResolvedValue([studentPostValidatorDataOk]),
    count: jest.fn().mockResolvedValue(1),
    findOne: jest.fn().mockResolvedValue(studentPostValidatorDataOk),
    remove: jest.fn().mockResolvedValue(studentPostValidatorDataOk)
  })
}

export const dbConnectionStudentDepFail = {
  getRepository: jest.fn().mockReturnValue({
    findOne: jest.fn().mockReturnValue(null)
  })
}

export const errorHandlerDep = {
  responseForbidden: jest.fn(),
  responseBadRequest: jest.fn(),
  notFound: jest.fn(),
  responseUnauthorized: jest.fn(),
  responseInternalServerError: jest.fn()
}

export const QueryFailedError = {
  name: 'QueryFailedError',
  message: 'error',
  detail: 'Key (ra)=(434179822) already exists.'
}

export const queryFailedErrorResponse = [
  {
    code: 'QueryFailedError',
    path: ['ra'],
    message: 'Key (ra)=(434179822) already exists.'
  }
]

export const zodErrorPath = {
  name: 'ZodError',
  errors: [
    {
      code: 'invalid_string',
      path: ['email'],
      message: 'Invalid email'
    }
  ]
}

export const zodErrorPathResponse = [zodErrorPath.errors[0]]

export const ZodErrorKeys = {
  name: 'ZodError',
  errors: [
    {
      code: 'invalid_type',
      path: [],
      keys: ['email'],
      message: 'Invalid email'
    }
  ]
}

export const zodErrorKeysResponse = [
  {
    code: 'invalid_type',
    path: ['email'],
    message: 'Invalid email'
  }
]

export const notFound = {
  name: 'NotFound',
  field: 'id',
  message: 'Student not found'
}

export const notFoundResponse = [{ code: 'NotFound', path: ['id'], message: 'Student not found' }]

export const forbidden = {
  name: 'Forbidden',
  field: 'password',
  message: 'wrong password'
}

export const forbiddenResponse = [
  { code: 'Forbidden', path: ['password'], message: 'wrong password' }
]

export const unauthorized = {
  name: 'Unauthorized',
  field: 'token',
  message: 'invalid token'
}

export const unauthorizedNoField = {
  name: 'Unauthorized',
  message: 'invalid token'
}

export const unauthorizedResponse = [
  { code: 'Unauthorized', path: ['token'], message: 'invalid token' }
]

export const notImplementedError = {
  name: 'RandomError',
  message: 'random error'
}

export const notImplementedErrorResponse = [
  { code: 'NotImplementedError', path: [], message: 'random error' }
]

export const mountRequestReq = {
  headers: {
    authorization: 'Bearer token'
  },
  body: {
    name: 'name',
    email: 'email@email.com'
  },
  query: {
    skip: 0,
    limit: 10
  },
  params: {
    id: '3b450ee7-b596-47f1-9636-fdfdf9a1bc86'
  }
}

export const typeOrmDepOk = {
  DataSource: jest.fn().mockImplementation(() => {
    return {
      initialize: jest.fn()
    }
  }),
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}

export const typeOrmDepFail = {
  DataSource: jest.fn().mockImplementation(() => {
    return {
      initialize: jest.fn().mockRejectedValue(new Error('error'))
    }
  }),
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}
