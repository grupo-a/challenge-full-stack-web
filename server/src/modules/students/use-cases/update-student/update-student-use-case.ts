import { IUpdateStudentDTO } from '../../../../adapters/student/update-student-dto.interface'
import { NotFoundError } from '../../../../errors/not-found-error'
import { IStudent } from '../../model/Student.interface'
import { IStudentsRepository } from '../../repositories/students-repository.interface'
import { IUseCase } from '../use-case.interface'

class UpdateStudentUseCase implements IUseCase<IUpdateStudentDTO, void> {
    constructor(private readonly studentsRepository: IStudentsRepository) {}

    async execute({ id, name, email }: IUpdateStudentDTO): Promise<void> {
        const studentFound = await this.studentsRepository.getById(id)

        if (!studentFound) {
            throw new NotFoundError('Student not found')
        }

        const studentToUpdate: IStudent = {
            ...studentFound,
            name: name || studentFound.name,
            email: email || studentFound.email,
        }

        await this.studentsRepository.update(studentToUpdate)
    }
}

export { UpdateStudentUseCase }
