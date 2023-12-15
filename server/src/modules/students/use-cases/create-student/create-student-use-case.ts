import { ICreateStudentDTO } from '../../../../adapters/student/create-student-dto.interface'
import { IStudentsRepository } from '../../repositories/students-repository.interface'
import { IUseCase } from '../use-case.interface'

class CreateStudentUseCase implements IUseCase<ICreateStudentDTO, void> {
    constructor(private readonly studentsRepository: IStudentsRepository) {}

    async execute({ name, email, ra, cpf }: ICreateStudentDTO): Promise<void> {
        const studentAlreadyExists = await this.studentsRepository.getByRA(ra)

        if (studentAlreadyExists) {
            throw new Error('Student already exists')
        }

        await this.studentsRepository.create({ name, email, ra, cpf })
    }
}

export { CreateStudentUseCase }
