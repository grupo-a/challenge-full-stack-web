import { type IStudentsRepository } from '../../repositories/students-repository.interface'
import { type UseCase } from '../use-case.interface'

class DeleteStudentUseCase implements UseCase<string, void> {
    constructor(private readonly studentsRepository: IStudentsRepository) {}

    async execute(id: string): Promise<void> {
        await this.studentsRepository.delete(id)
    }
}

export { DeleteStudentUseCase }
