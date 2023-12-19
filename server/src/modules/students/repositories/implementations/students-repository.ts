import { ICreateStudentDTO } from '../../../../adapters/student/create-student-dto.interface'
import { prisma } from '../../../../database/prisma'
import { AppErrorHandler } from '../../../../errors/app-error-handler'
import { IStudent } from '../../model/Student.interface'
import { IStudentsRepository } from '../students-repository.interface'

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
            throw new AppErrorHandler(JSON.stringify(error), 500)
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
            throw new AppErrorHandler(JSON.stringify(error), 500)
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
            throw new AppErrorHandler(JSON.stringify(error), 500)
        }
    }

    async list(): Promise<IStudent[]> {
        try {
            const students = await prisma.student.findMany()

            return students
        } catch (error) {
            console.error(error)
            throw new AppErrorHandler(JSON.stringify(error), 500)
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
            throw new AppErrorHandler(JSON.stringify(error), 500)
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
            throw new AppErrorHandler(JSON.stringify(error), 500)
        }
    }
}

export { StudentsRepository }
