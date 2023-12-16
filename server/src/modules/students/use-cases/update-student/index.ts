import { StudentsRepository } from '../../repositories/implementations/students-repository'

import { UpdateStudentController } from './update-student-controller'
import { UpdateStudentUseCase } from './update-student-use-case'

const studentsRepository = StudentsRepository.getInstance()

const updateStudentUseCase = new UpdateStudentUseCase(studentsRepository)

const updateStudentController = new UpdateStudentController(updateStudentUseCase)

export { updateStudentController }
