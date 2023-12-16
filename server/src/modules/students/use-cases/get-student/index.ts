import { StudentsRepository } from '../../repositories/implementations/students-repository'

import { GetStudentController } from './get-student-controller'
import { GetStudentUseCase } from './get-student-use-case'

const studentsRepository = StudentsRepository.getInstance()

const getStudentUseCase = new GetStudentUseCase(studentsRepository)

const getStudentController = new GetStudentController(getStudentUseCase)

export { getStudentController }
