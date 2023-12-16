import { randomUUID } from 'node:crypto'

import { ICreateStudentDTO } from '../../../../adapters/student/create-student-dto.interface'
import { IStudent } from '../../model/Student.interface'
import { IStudentsRepository } from '../students-repository.interface'

class StudentsRepositoryInMemory implements IStudentsRepository {
    students: IStudent[] = []

    async create({ name, email, ra, cpf }: ICreateStudentDTO): Promise<void> {
        const student: IStudent = {
            id: randomUUID(),
            name,
            email,
            ra,
            cpf,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        this.students.push(student)
    }

    async getById(id: string): Promise<IStudent | null> {
        const student = this.students.find((item) => item.id === id) || null
        return student
    }

    async getByRA(ra: string): Promise<IStudent | null> {
        const student = this.students.find((item) => item.ra === ra) || null
        return student
    }

    async list(): Promise<IStudent[]> {
        return this.students
    }

    async update(student: IStudent): Promise<void> {
        const index = this.students.findIndex((item) => item.id === student.id)
        if (index >= 0) this.students.splice(index, 1, student)
    }

    async delete(id: string): Promise<void> {
        const index = this.students.findIndex((item) => item.id === id)
        this.students.splice(index, 1)
    }
}

export { StudentsRepositoryInMemory }
