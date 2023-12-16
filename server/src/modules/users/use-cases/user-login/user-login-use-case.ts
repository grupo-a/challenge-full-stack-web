import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { IUserLoginDTO, ITokenPayload } from '../../../../adapters/user/user-login-dto.interface'
import { BadRequestError } from '../../../../errors/bad-request-error'
import { NotFoundError } from '../../../../errors/not-found-error'
import { IUsersRepository } from '../../repositories/users-repository.interface'
import { IUseCase } from '../use-case.interface'

class UserLoginUseCase implements IUseCase<IUserLoginDTO, string> {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async execute({ email, password }: IUserLoginDTO): Promise<string> {
        const user = await this.usersRepository.getByEmail(email)

        if (!user) {
            throw new NotFoundError('User not found')
        }

        const passwordIsValid = await compare(password, user.password)
        if (!passwordIsValid) throw new BadRequestError('Password is invalid')

        const secret = process.env.JWT_SECRET
        if (!secret) throw new BadRequestError('JWT secret is invalid')

        const tokenPayload: ITokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
        }

        const token = sign(tokenPayload, secret, {
            expiresIn: '1d',
        })

        return token
    }
}

export { UserLoginUseCase }
