import { StudentsRepository } from '../../repositories/implementations/students-repository'

import { DeleteStudentController } from './delete-student-controller'
import { DeleteStudentUseCase } from './delete-student-use-case'

const studentsRepository = StudentsRepository.getInstance()

const deleteStudentUseCase = new DeleteStudentUseCase(studentsRepository)

const deleteStudentController = new DeleteStudentController(deleteStudentUseCase)

export { deleteStudentController }
