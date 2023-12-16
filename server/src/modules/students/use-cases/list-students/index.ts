import { StudentsRepository } from '../../repositories/implementations/students-repository'

import { ListStudentsController } from './list-students-controller'
import { ListStudentsUseCase } from './list-students-use-case'

const studentsRepository = StudentsRepository.getInstance()

const listStudentsUseCase = new ListStudentsUseCase(studentsRepository)

const listStudentsController = new ListStudentsController(listStudentsUseCase)

export { listStudentsController }
