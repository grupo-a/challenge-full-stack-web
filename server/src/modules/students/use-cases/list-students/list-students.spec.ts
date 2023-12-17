import { beforeEach, describe, expect, it } from 'vitest'

import { faker } from '@faker-js/faker'

import { ICreateStudentDTO } from '../../../../adapters/student/create-student-dto.interface'
import { StudentsRepositoryInMemory } from '../../repositories/in-memory/students-repository-in-memory'
import { CreateStudentUseCase } from '../create-student/create-student-use-case'

import { ListStudentsUseCase } from './list-students-use-case'

let createStudentUseCase: CreateStudentUseCase
let listStudentsUseCase: ListStudentsUseCase
let studentsRepositoryInMemory: StudentsRepositoryInMemory

describe('List students', () => {
    beforeEach(() => {
        studentsRepositoryInMemory = new StudentsRepositoryInMemory()
        createStudentUseCase = new CreateStudentUseCase(studentsRepositoryInMemory)
        listStudentsUseCase = new ListStudentsUseCase(studentsRepositoryInMemory)
    })

    it('should be able to list all students', async () => {
        const studentsToCreate: ICreateStudentDTO[] = [
            {
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
            },
            {
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
            },
        ]

        await createStudentUseCase.execute(studentsToCreate[0])
        await createStudentUseCase.execute(studentsToCreate[1])

        const studentsFound = await listStudentsUseCase.execute()

        expect(studentsFound).length(2)
        expect(studentsFound).toMatchObject([studentsToCreate[0], studentsToCreate[1]])
    })
})
