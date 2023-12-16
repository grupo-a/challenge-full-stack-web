import { hash } from 'bcryptjs'

import { ICreateUserDTO } from '../../../../adapters/user/create-user-dto.interface'
import { BadRequestError } from '../../../../errors/bad-request-error'
import { IUsersRepository } from '../../repositories/users-repository.interface'
import { IUseCase } from '../use-case.interface'

class CreateUserUseCase implements IUseCase<ICreateUserDTO, void> {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async execute({ email, username, password, role }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.getByEmail(email)

        if (userAlreadyExists) {
            throw new BadRequestError('User already exists')
        }

        const passwordHash = await hash(password, 12)

        await this.usersRepository.create({ email, username, password: passwordHash, role })
    }
}

export { CreateUserUseCase }
