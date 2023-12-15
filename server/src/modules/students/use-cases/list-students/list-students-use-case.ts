import { type IStudent } from '../../model/Student'
import { type IStudentsRepository } from '../../repositories/students-repository.interface'
import { type UseCase } from '../use-case.interface'

class ListStudentsUseCase implements UseCase<void, IStudent[]> {
    constructor(private readonly studentsRepository: IStudentsRepository) {}

    async execute(): Promise<IStudent[]> {
        return await this.studentsRepository.list()
    }
}

export { ListStudentsUseCase }
