import { beforeEach, describe, expect, it } from 'vitest'

import { faker } from '@faker-js/faker'

import { ICreateStudentDTO } from '../../../../adapters/student/create-student-dto.interface'
import { IUpdateStudentDTO } from '../../../../adapters/student/update-student-dto.interface'
import { AppErrorHandler } from '../../../../errors/app-error-handler'
import { StudentsRepositoryInMemory } from '../../repositories/in-memory/students-repository-in-memory'
import { CreateStudentUseCase } from '../create-student/create-student-use-case'

import { UpdateStudentUseCase } from './update-student-use-case'

let createStudentUseCase: CreateStudentUseCase
let updateStudentUseCase: UpdateStudentUseCase
let studentsRepositoryInMemory: StudentsRepositoryInMemory

describe('Update student', () => {
    beforeEach(() => {
        studentsRepositoryInMemory = new StudentsRepositoryInMemory()
        createStudentUseCase = new CreateStudentUseCase(studentsRepositoryInMemory)
        updateStudentUseCase = new UpdateStudentUseCase(studentsRepositoryInMemory)
    })

    it('should be able to update a student', async () => {
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

        const studentToUpdate: IUpdateStudentDTO = {
            id: studentCreated.id,
            name: faker.person.firstName(),
            email: faker.internet.email({
                allowSpecialCharacters: false,
            }),
        }

        await updateStudentUseCase.execute(studentToUpdate)

        const studentUpdated = await studentsRepositoryInMemory.getById(studentToUpdate.id)
        if (!studentUpdated) throw new Error('Test failed')

        expect(studentUpdated).toMatchObject(studentToUpdate)
    })

    it('should not be able to update a student if it does not exist', async () => {
        expect(async () => {
            await updateStudentUseCase.execute({ id: '123' })
        }).rejects.toBeInstanceOf(AppErrorHandler)
    })
})
