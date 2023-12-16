import { StudentsRepository } from '../../repositories/implementations/students-repository'

import { CreateStudentController } from './create-student-controller'
import { CreateStudentUseCase } from './create-student-use-case'

const studentsRepository = StudentsRepository.getInstance()

const createStudentUseCase = new CreateStudentUseCase(studentsRepository)

const createStudentController = new CreateStudentController(createStudentUseCase)

export { createStudentController }
