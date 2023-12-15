import { IStudent } from '../../model/Student.interface'
import { IStudentsRepository } from '../../repositories/students-repository.interface'
import { IUseCase } from '../use-case.interface'

class ListStudentsUseCase implements IUseCase<void, IStudent[]> {
    constructor(private readonly studentsRepository: IStudentsRepository) {}

    async execute(): Promise<IStudent[]> {
        return this.studentsRepository.list()
    }
}

export { ListStudentsUseCase }
