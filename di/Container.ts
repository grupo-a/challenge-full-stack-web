import 'reflect-metadata'
import { container } from 'tsyringe'
import { StudentService } from '../src/application/service/StudentService'
import { StudentRepository } from '../src/domain/infraestructure/StudentRepository'
import { AddStudentController } from '../src/presentation/controllers/AddStudentController'
import { Routes } from '../src/presentation/http/Routes'
import { tokens } from './Tokens'

const childContainer = container.createChildContainer()

childContainer.registerSingleton(tokens.Routes, Routes)
childContainer.registerSingleton(tokens.AddStudentController, AddStudentController)
childContainer.registerSingleton(tokens.StudentService, StudentService)
childContainer.registerSingleton(tokens.StudentRepository, StudentRepository)

export { childContainer as container }
