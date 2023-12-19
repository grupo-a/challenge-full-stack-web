import { beforeEach, describe, expect, it } from 'vitest'

import { faker } from '@faker-js/faker'

import { ICreateStudentDTO } from '../../../../adapters/student/create-student-dto.interface'
import { AppErrorHandler } from '../../../../errors/app-error-handler'
import { StudentsRepositoryInMemory } from '../../repositories/in-memory/students-repository-in-memory'
import { CreateStudentUseCase } from '../create-student/create-student-use-case'

import { DeleteStudentUseCase } from './delete-student-use-case'

let createStudentUseCase: CreateStudentUseCase
let deleteStudentUseCase: DeleteStudentUseCase
let studentsRepositoryInMemory: StudentsRepositoryInMemory

describe('Delete student', () => {
    beforeEach(() => {
        studentsRepositoryInMemory = new StudentsRepositoryInMemory()
        createStudentUseCase = new CreateStudentUseCase(studentsRepositoryInMemory)
        deleteStudentUseCase = new DeleteStudentUseCase(studentsRepositoryInMemory)
    })

    it('should be able to delete a student', async () => {
        const studentToCreate: ICreateStudentDTO = {
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

        await createStudentUseCase.execute(studentToCreate)

        const studentCreated = await studentsRepositoryInMemory.getByRA(studentToCreate.ra)
        if (!studentCreated) throw new Error('Test failed')

        await deleteStudentUseCase.execute(studentCreated.id)

        const student = await studentsRepositoryInMemory.getById(studentCreated.id)

        expect(student).toBeNull()
    })

    it('should not be able to delete a student if it does not exist', async () => {
        expect(async () => {
            await deleteStudentUseCase.execute('123')
        }).rejects.toBeInstanceOf(AppErrorHandler)
    })
})
