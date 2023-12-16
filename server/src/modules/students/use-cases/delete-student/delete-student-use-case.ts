import { NotFoundError } from '../../../../errors/not-found-error'
import { IStudentsRepository } from '../../repositories/students-repository.interface'
import { IUseCase } from '../use-case.interface'

class DeleteStudentUseCase implements IUseCase<string, void> {
    constructor(private readonly studentsRepository: IStudentsRepository) {}

    async execute(id: string): Promise<void> {
        const student = await this.studentsRepository.getById(id)
        if (!student) throw new NotFoundError('Student not found')

        await this.studentsRepository.delete(id)
    }
}

export { DeleteStudentUseCase }
