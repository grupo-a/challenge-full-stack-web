import { beforeEach, describe, expect, it } from 'vitest'

import { faker } from '@faker-js/faker'

import { ICreateUserDTO } from '../../../../adapters/user/create-user-dto.interface'
import { AppErrorHandler } from '../../../../errors/app-error-handler'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/users-repository-in-memory'

import { CreateUserUseCase } from './create-user-use-case'

let createUserUseCase: CreateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory

let userToCreate: ICreateUserDTO

describe('Create user', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)

        userToCreate = {
            username: faker.person.firstName(),
            email: faker.internet.email({
                allowSpecialCharacters: false,
            }),
            password: faker.number.int({ min: 100000, max: 999999 }).toString(),
            role: 'ADMIN',
        }
    })

    it('should be able to create a new user', async () => {
        await createUserUseCase.execute(userToCreate)
        const userCreated = await usersRepositoryInMemory.getByEmail(userToCreate.email)

        expect(userCreated).toHaveProperty('id')
    })

    it('should not be able to create a new user with same email exists', async () => {
        expect(async () => {
            await createUserUseCase.execute(userToCreate)
            await createUserUseCase.execute(userToCreate)
        }).rejects.toBeInstanceOf(AppErrorHandler)
    })
})
