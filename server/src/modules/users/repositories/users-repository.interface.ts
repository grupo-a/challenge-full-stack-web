import { ICreateUserDTO } from '../../../adapters/user/create-user-dto.interface'
import { IUser } from '../model/User.interface'

interface IUsersRepository {
    create: (data: ICreateUserDTO) => Promise<void>
    getByEmail: (email: string) => Promise<IUser | null>
}

export { IUsersRepository }
