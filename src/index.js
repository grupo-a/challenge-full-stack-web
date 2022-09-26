//Libs
import express from 'express'
import router from './routes/index.js'
import winston from 'winston'
import zod from 'zod'
import bcrypt from 'bcrypt'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import swaggerJSDoc from 'swagger-jsdoc'
import { DataSource } from 'typeorm'

//Utils
import {
  responseOk,
  responseBadRequest,
  responseForbidden,
  notFound,
  responseInternalServerError,
  responseUnauthorized
} from './utils/restResponse.js'
import { errorHandler, CustomError } from './utils/errorHandler.js'
import mountRequest from './utils/mountRequest.js'
import hashBcrypt from './utils/hashBcrypt.js'
import { isValidCPF } from './utils/validations.js'
import { strToBool } from './utils/convertions.js'

//Configs
import ormconfig from './config/database/postgres/ormconfig.js'
import logger from './config/logger.js'
import postgresConnection from './config/database/postgres/postgres.js'

//Services
import studentService from './services/students.js'
import managerService from './services/managers.js'

//Validators
import studentPostValidator from './controllers/students/validators/studentPostValidator.js'
import studentPatchValidator from './controllers/students/validators/studentPatchValidator.js'
import studentGetListValidator from './controllers/students/validators/studentGetListValidator.js'
import studentDeleteValidator from './controllers/students/validators/studentDeleteValidator.js'
import authenticationPostValidator from './controllers/authentication/validators/authenticationPostValidator.js'
import checkAuthHeadersValidator from './middlewares/validators/checkAuthHeadersValidator.js'

//Controllers
import studentGeneric from './controllers/students/studentGeneric.js'
import authenticationPost from './controllers/authentication/authenticationPost.js'
import swaggerGet from './controllers/swagger/swaggerGet.js'

//Middlewares
import checkAuth from './middlewares/checkAuth.js'

//Server
import server from './server.js'

//Low level dependencies
const restResponsesDep = {
  responseOk,
  responseBadRequest,
  responseForbidden,
  notFound,
  responseInternalServerError,
  responseUnauthorized
}
const errorHandlerDep = errorHandler(restResponsesDep)
const loggerDep = logger(winston)
const typeOrmDep = {
  DataSource,
  ormconfig: ormconfig(strToBool),
  logger: loggerDep
}
const postgresConnectionDep = await postgresConnection(typeOrmDep)
const hashBcryptDep = hashBcrypt(bcrypt, CustomError)
const studentRepo = studentService(postgresConnectionDep, CustomError)
const managerRepo = managerService(postgresConnectionDep, CustomError)

//Mid level dependencies (validators)
const studentPostValidatorDep = studentPostValidator(zod, isValidCPF)
const studentPatchValidatorDep = studentPatchValidator(zod)
const studentGetListValidatorDep = studentGetListValidator(zod)
const studentDeleteValidatorDep = studentDeleteValidator(zod)
const authenticationPostValidatorDep = authenticationPostValidator(zod)
const checkAuthHeadersValidatorDep = checkAuthHeadersValidator(zod)

//Mid level dependencies (controllers)
const studentPostDep = {
  logger: loggerDep.error,
  responseOk,
  errorHandler: errorHandlerDep,
  validator: studentPostValidatorDep.parse,
  databaseCall: studentRepo.createStudent,
  mountRequest: mountRequest('POST')
}
const studentPatchDep = {
  logger: loggerDep.error,
  responseOk,
  errorHandler: errorHandlerDep,
  validator: studentPatchValidatorDep.parse,
  databaseCall: studentRepo.updateStudent,
  mountRequest: mountRequest('PATCH')
}
const studentGetListDep = {
  logger: loggerDep.error,
  responseOk,
  errorHandler: errorHandlerDep,
  validator: studentGetListValidatorDep.parse,
  databaseCall: studentRepo.listStudents,
  mountRequest: mountRequest('GET')
}
const studentDeleteDep = {
  logger: loggerDep.error,
  responseOk,
  errorHandler: errorHandlerDep,
  validator: studentDeleteValidatorDep.parse,
  databaseCall: studentRepo.deleteStudent,
  mountRequest: mountRequest('DELETE')
}
const authenticationPostDep = {
  logger: loggerDep.error,
  responseOk,
  errorHandler: errorHandlerDep,
  validator: authenticationPostValidatorDep.parse,
  databaseCall: managerRepo.getManagerByEmail,
  mountRequest: mountRequest('POST'),
  compareHash: hashBcryptDep.compareHash,
  createToken: jwt.sign
}

const swaggerGetDep = {
  swagger: swaggerJSDoc,
  responseOk
}

//Mid level dependencies (middlewares)
const checkAuthDep = {
  logger: loggerDep.error,
  validator: checkAuthHeadersValidatorDep.parse,
  CustomError,
  verifyToken: jwt.verify,
  mountRequest: mountRequest('MIDDLEWARE_AUTH'),
  errorHandler: errorHandlerDep
}

// Controllers
const studentPostController = studentGeneric(studentPostDep)
const studentPatchController = studentGeneric(studentPatchDep)
const studentGetListController = studentGeneric(studentGetListDep)
const studentDeleteController = studentGeneric(studentDeleteDep)
const authenticationPostController = authenticationPost(authenticationPostDep)
const swaggerGetController = swaggerGet(swaggerGetDep)

// Middlewares
const checkAuthMiddleware = checkAuth(checkAuthDep)

// High level dependencies
const routerDeps = {
  express,
  studentPostController,
  studentPatchController,
  studentGetListController,
  studentDeleteController,
  authenticationPostController,
  swaggerGetController,
  checkAuthMiddleware
}

// Server
const routerInstance = router(routerDeps)
const serverInstance = server(express, cors, routerInstance)
const port = process.env.PORT || 3000
await serverInstance.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
