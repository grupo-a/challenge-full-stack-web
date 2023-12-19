import { beforeEach, describe, expect, it } from 'vitest'

import { faker } from '@faker-js/faker'

import { ICreateStudentDTO } from '../../../../adapters/student/create-student-dto.interface'
import { AppErrorHandler } from '../../../../errors/app-error-handler'
import { StudentsRepositoryInMemory } from '../../repositories/in-memory/students-repository-in-memory'

import { CreateStudentUseCase } from './create-student-use-case'

let createStudentUseCase: CreateStudentUseCase
let studentsRepositoryInMemory: StudentsRepositoryInMemory

let studentToCreate: ICreateStudentDTO

describe('Create student', () => {
    beforeEach(() => {
        studentsRepositoryInMemory = new StudentsRepositoryInMemory()
        createStudentUseCase = new CreateStudentUseCase(studentsRepositoryInMemory)

        studentToCreate = {
            name: faker.person.firstName(),
            email: faker.internet.email({
                allowSpecialCharacters: false,
            }),
            ra: faker.number
                .int({
                    min: 1000000,
                    max: 9999999,
                })
                .toString(),
            cpf: faker.number
                .int({
                    min: 10000000000,
                    max: 99999999999,
                })
                .toString(),
        }
    })

    it('should be able to create a new student', async () => {
        await createStudentUseCase.execute(studentToCreate)
        const studentCreated = await studentsRepositoryInMemory.getByRA(studentToCreate.ra)

        expect(studentCreated).toHaveProperty('id')
    })

    it('should not be able to create a new student with same RA exists', async () => {
        expect(async () => {
            await createStudentUseCase.execute(studentToCreate)
            await createStudentUseCase.execute(studentToCreate)
        }).rejects.toBeInstanceOf(AppErrorHandler)
    })
})
