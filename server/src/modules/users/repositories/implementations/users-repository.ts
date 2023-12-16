import { ICreateUserDTO } from '../../../../adapters/user/create-user-dto.interface'
import { prisma } from '../../../../database/prisma'
import { AppErrorHandler } from '../../../../errors/app-error-handler'
import { IUser } from '../../model/User.interface'
import { IUsersRepository } from '../users-repository.interface'

class UsersRepository implements IUsersRepository {
    private static INSTANCE: IUsersRepository

    public static getInstance(): IUsersRepository {
        if (!UsersRepository.INSTANCE) {
            UsersRepository.INSTANCE = new UsersRepository()
        }
        return UsersRepository.INSTANCE
    }

    async create({ email, username, password, role }: ICreateUserDTO): Promise<void> {
        try {
            await prisma.user.create({
                data: {
                    email,
                    username,
                    password,
                    role,
                },
            })
        } catch (error) {
            throw new AppErrorHandler(JSON.stringify(error), 500)
        }
    }

    async getByEmail(email: string): Promise<IUser | null> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            })

            return user
        } catch (error) {
            throw new AppErrorHandler(JSON.stringify(error), 500)
        }
    }
}

export { UsersRepository }
