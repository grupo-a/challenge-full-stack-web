import { beforeEach, describe, expect, it } from 'vitest'

import { faker } from '@faker-js/faker'

import { ICreateUserDTO } from '../../../../adapters/user/create-user-dto.interface'
import { AppErrorHandler } from '../../../../errors/app-error-handler'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/users-repository-in-memory'
import { CreateUserUseCase } from '../create-user/create-user-use-case'

import { UserLoginUseCase } from './user-login-use-case'

let createUserUseCase: CreateUserUseCase
let userLoginUseCase: UserLoginUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory

let userToCreate: ICreateUserDTO

describe('User login', () => {
    beforeEach(() => {
        process.env.JWT_SECRET = 'secret-teste'

        usersRepositoryInMemory = new UsersRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
        userLoginUseCase = new UserLoginUseCase(usersRepositoryInMemory)

        userToCreate = {
            username: faker.person.firstName(),
            email: faker.internet.email({
                allowSpecialCharacters: false,
            }),
            password: faker.number.int({ min: 100000, max: 999999 }).toString(),
            role: 'ADMIN',
        }
    })

    it('should be able to login a user', async () => {
        await createUserUseCase.execute(userToCreate)

        await usersRepositoryInMemory.getByEmail(userToCreate.email)

        const token = await userLoginUseCase.execute({ email: userToCreate.email, password: userToCreate.password })

        expect(token).toBeTypeOf('string')
    })

    it('should not be able to login a user', async () => {
        expect(async () => {
            await userLoginUseCase.execute({ email: userToCreate.email, password: userToCreate.password })
        }).rejects.toBeInstanceOf(AppErrorHandler)
    })

    it('should not be able to authenticate with incorrect password', async () => {
        expect(async () => {
            await createUserUseCase.execute(userToCreate)

            await usersRepositoryInMemory.getByEmail(userToCreate.email)

            await userLoginUseCase.execute({ email: userToCreate.email, password: '123456' })
        }).rejects.toBeInstanceOf(AppErrorHandler)
    })

    it('should not be able to authenticate witless the JWT_SECRET environment', async () => {
        expect(async () => {
            process.env.JWT_SECRET = ''
            await createUserUseCase.execute(userToCreate)

            await usersRepositoryInMemory.getByEmail(userToCreate.email)

            await userLoginUseCase.execute({ email: userToCreate.email, password: userToCreate.password })
        }).rejects.toBeInstanceOf(AppErrorHandler)
    })
})
