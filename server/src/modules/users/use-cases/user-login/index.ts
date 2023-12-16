import { UsersRepository } from '../../repositories/implementations/users-repository'

import { UserLoginController } from './user-login-controller'
import { UserLoginUseCase } from './user-login-use-case'

const usersRepository = UsersRepository.getInstance()

const userLoginUseCase = new UserLoginUseCase(usersRepository)

const userLoginController = new UserLoginController(userLoginUseCase)

export { userLoginController }
