import { ICreateStudentDTO } from '../../../adapters/student/create-student-dto.interface'
import { prisma } from '../../../prisma'
import { IStudent } from '../model/Student.interface'

import { IStudentsRepository } from './students-repository.interface'

class StudentsRepository implements IStudentsRepository {
    private static INSTANCE: IStudentsRepository

    public static getInstance(): IStudentsRepository {
        if (!StudentsRepository.INSTANCE) {
            StudentsRepository.INSTANCE = new StudentsRepository()
        }
        return StudentsRepository.INSTANCE
    }

    async create({ name, email, ra, cpf }: ICreateStudentDTO): Promise<void> {
        try {
            await prisma.student.create({
                data: {
                    name,
                    email,
                    ra,
                    cpf,
                },
            })
        } catch (error) {
            console.error(error)
            throw new Error(JSON.stringify(error, null, 2))
        }
    }

    async getById(id: string): Promise<IStudent | null> {
        try {
            const student = await prisma.student.findUnique({
                where: {
                    id,
                },
            })

            return student
        } catch (error) {
            console.error(error)
            throw new Error(JSON.stringify(error, null, 2))
        }
    }

    async getByRA(ra: string): Promise<IStudent | null> {
        try {
            const student = await prisma.student.findUnique({
                where: {
                    ra,
                },
            })

            return student
        } catch (error) {
            console.error(error)
            throw new Error(JSON.stringify(error, null, 2))
        }
    }

    async list(): Promise<IStudent[]> {
        try {
            const students = await prisma.student.findMany()

            return students
        } catch (error) {
            console.error(error)
            throw new Error(JSON.stringify(error, null, 2))
        }
    }

    async update(student: IStudent): Promise<void> {
        try {
            await prisma.student.update({
                where: {
                    id: student.id,
                },
                data: {
                    ...student,
                },
            })
        } catch (error) {
            console.error(error)
            throw new Error(JSON.stringify(error, null, 2))
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.student.delete({
                where: {
                    id,
                },
            })
        } catch (error) {
            console.error(error)
            throw new Error(JSON.stringify(error, null, 2))
        }
    }
}

export { StudentsRepository }
