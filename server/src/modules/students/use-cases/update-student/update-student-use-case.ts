import { type IUpdateStudentDTO } from '../../../../adapters/student/update-student-dto.interface'
import { type IStudent } from '../../model/Student'
import { type IStudentsRepository } from '../../repositories/students-repository.interface'
import { type UseCase } from '../use-case.interface'

class UpdateStudentUseCase implements UseCase<IUpdateStudentDTO, void> {
    constructor(private readonly studentsRepository: IStudentsRepository) {}

    async execute({ id, name, email }: IUpdateStudentDTO): Promise<void> {
        const studentFound = await this.studentsRepository.getById(id)

        if (!studentFound) {
            throw new Error('Student not found')
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
