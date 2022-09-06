import { prisma } from '../../database/PrismaClient'
import { IStudent } from './interfaces/IStudent'
import { IStudentRepository } from './interfaces/IStudentRepository'

export class StudentRepository implements IStudentRepository {
  async add(student: IStudent): Promise<IStudent> {
    return await prisma.student.create({
      data: student,
    })
  }

  async getByName(name: string): Promise<IStudent[]> {
    return await prisma.student.findMany({
      where: {
        nome: {
          contains: name,
          mode: 'insensitive',
        },
      },
      orderBy: {
        id: 'asc',
      },
    })
  }

  async getByRa(ra: number): Promise<IStudent | null> {
    return await prisma.student.findFirst({
      where: {
        ra: Number(ra),
      },
    })
  }

  async getAll(): Promise<IStudent[]> {
    return await prisma.student.findMany({
      orderBy: {
        id: 'asc',
      },
    })
  }

  async update(student: any): Promise<IStudent> {
    const studentRa = Number(student.ra)

    const result = await this.getByRa(studentRa)

    if (result == null) {
      throw new Error('Aluno não encontrado.')
    }

    return await prisma.student.update({
      where: {
        id: result.id,
      },
      data: {
        nome: student.nome || result.nome,
        email: student.email || result.email,
      },
    })
  }

  async delete(studentRa: number): Promise<IStudent> {
    const result = await this.getByRa(studentRa)

    if (result == null) {
      throw new Error('Aluno não encontrado.')
    }

    return await prisma.student.update({
      where: {
        id: result.id,
      },
      data: {
        isActive: false,
      },
    })
  }
}
