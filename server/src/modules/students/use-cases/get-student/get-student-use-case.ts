import { type IStudent } from '../../model/Student'
import { type IStudentsRepository } from '../../repositories/students-repository.interface'
import { type UseCase } from '../use-case.interface'

class GetStudentUseCase implements UseCase<string, IStudent> {
    constructor(private readonly studentsRepository: IStudentsRepository) {}

    async execute(id: string): Promise<IStudent> {
        const student = await this.studentsRepository.getById(id)

        if (!student) {
            throw new Error('Student not found')
        }

        return student
    }
}

export { GetStudentUseCase }
