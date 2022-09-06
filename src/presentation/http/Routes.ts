/* eslint-disable @typescript-eslint/no-misused-promises */
import 'reflect-metadata'
import { injectable } from 'tsyringe'
import { Router } from 'express'
import { AddStudentController } from '../controllers/AddStudentController'
import { StudentService } from '../../application/service/StudentService'
import { StudentRepository } from '../../domain/infraestructure/StudentRepository'
import { GetAllStudentsController } from '../controllers/GetAllStudentsController'
import { GetStudentController } from '../controllers/GetStudentByRaController'
import { GetStudentsByNameController } from '../controllers/GetStudentsByNameController'
import { UpdateStudentController } from '../controllers/UpdateStudentController'
import { DeleteStudentController } from '../controllers/DeleteStudentController'

@injectable()
export class Routes {
  // constructor() {} // private addStudentController: AddStudentController // @inject(tokens.AddStudentController)

  public setupRouter(router: Router): void {
    // FIXME: Corrigir a chamada ao método
    const studentService = new StudentService(new StudentRepository())

    router.get('/students', async (req, res) => {
      const result = await new GetAllStudentsController(studentService).handle(req)
      return res.status(result.statusCode).json(result.body)
    })

    router.get('/student/name/:nome', async (req, res) => {
      const result = await new GetStudentsByNameController(studentService).handle(req)
      return res.status(result.statusCode).json(result.body)
    })

    router.get('/student/ra/:ra', async (req, res) => {
      const result = await new GetStudentController(studentService).handle(req)
      return res.status(result.statusCode).json(result.body)
    })

    router.post('/student', async (req, res) => {
      const result = await new AddStudentController(studentService).handle(req)

      return res.status(result.statusCode).json(result.body)
    })

    router.patch('/student', async (req, res) => {
      const result = await new UpdateStudentController(studentService).handle(req)
      return res.status(result.statusCode).json(result.body)
    })

    router.delete('/student/ra/:ra', async (req, res) => {
      const result = await new DeleteStudentController(studentService).handle(req)
      return res.status(result.statusCode).json(result.body)
    })
  }
}
