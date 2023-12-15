import { UsersRepository } from '../../repositories/users-repository'

import { CreateUserController } from './create-user-controller'
import { CreateUserUseCase } from './create-user-use-case'

const usersRepository = UsersRepository.getInstance()

const createUserUseCase = new CreateUserUseCase(usersRepository)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }
