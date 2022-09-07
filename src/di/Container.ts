import 'reflect-metadata'
import { LoginService } from '../application/service/LoginService'
import { LoginRepository } from '../domain/infraestructure/LoginRepository'
import { LoginController } from '../presentation/controllers/login/LoginController'
import { container } from 'tsyringe'
import { StudentService } from '../application/service/StudentService'
import { StudentRepository } from '../domain/infraestructure/StudentRepository'
import { AddStudentController } from '../presentation/controllers/student/AddStudentController'
import { Routes } from '../presentation/http/Routes'
import { tokens } from './Tokens'

const childContainer = container.createChildContainer()

childContainer.registerSingleton(tokens.Routes, Routes)

// Login
childContainer.registerSingleton(tokens.LoginController, LoginController)
childContainer.registerSingleton(tokens.LoginService, LoginService)
childContainer.registerSingleton(tokens.LoginRepository, LoginRepository)

// Student
childContainer.registerSingleton(tokens.AddStudentController, AddStudentController)
childContainer.registerSingleton(tokens.StudentService, StudentService)
childContainer.registerSingleton(tokens.StudentRepository, StudentRepository)

export { childContainer as container }
