import { randomUUID } from 'node:crypto'

import { ICreateUserDTO } from '../../../../adapters/user/create-user-dto.interface'
import { IUser } from '../../model/User.interface'
import { IUsersRepository } from '../users-repository.interface'

class UsersRepositoryInMemory implements IUsersRepository {
    users: IUser[] = []

    async create({ email, username, password, role }: ICreateUserDTO): Promise<void> {
        const user: IUser = {
            id: randomUUID(),
            email,
            username,
            password,
            role: role || 'USER',
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        this.users.push(user)
    }

    async getByEmail(email: string): Promise<IUser | null> {
        const user = this.users.find((item) => item.email === email) || null
        return user
    }
}

export { UsersRepositoryInMemory }
