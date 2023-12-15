import { IStudentsRepository } from '../../repositories/students-repository.interface'
import { IUseCase } from '../use-case.interface'

class DeleteStudentUseCase implements IUseCase<string, void> {
    constructor(private readonly studentsRepository: IStudentsRepository) {}

    async execute(id: string): Promise<void> {
        await this.studentsRepository.delete(id)
    }
}

export { DeleteStudentUseCase }
