import { type ICreateStudentDTO } from '../../../../adapters/student/create-student-dto.interface'
import { type IStudentsRepository } from '../../repositories/students-repository.interface'
import { type UseCase } from '../use-case.interface'

class CreateStudentUseCase implements UseCase<ICreateStudentDTO, void> {
    constructor(private readonly studentsRepository: IStudentsRepository) {}

    async execute({ name, email, ra, cpf }: ICreateStudentDTO): Promise<void> {
        const studentAlreadyExists = await this.studentsRepository.getByName(name)

        if (studentAlreadyExists) {
            throw new Error('Student already exists')
        }

        await this.studentsRepository.create({ name, email, ra, cpf })
    }
}

export { CreateStudentUseCase }
