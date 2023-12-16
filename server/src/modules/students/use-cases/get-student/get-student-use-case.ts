import { NotFoundError } from '../../../../errors/not-found-error'
import { IStudent } from '../../model/Student.interface'
import { IStudentsRepository } from '../../repositories/students-repository.interface'
import { IUseCase } from '../use-case.interface'

class GetStudentUseCase implements IUseCase<string, IStudent> {
    constructor(private readonly studentsRepository: IStudentsRepository) {}

    async execute(id: string): Promise<IStudent> {
        const student = await this.studentsRepository.getById(id)

        if (!student) {
            throw new NotFoundError('Student not found')
        }

        return student
    }
}

export { GetStudentUseCase }
