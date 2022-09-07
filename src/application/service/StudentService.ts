import 'reflect-metadata'
import { inject } from 'tsyringe'
import { tokens } from '../../di/Tokens'
import { IStudent } from '../../domain/infraestructure/interfaces/IStudent'
import { IStudentRepository } from '../../domain/infraestructure/interfaces/IStudentRepository'
import { IStudentService } from './interfaces/IStudentService'

export class StudentService implements IStudentService {
  constructor(
    @inject(tokens.StudentRepository)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async add(student: IStudent): Promise<IStudent> {
    return await this.studentRepository.add(student)
  }

  async getAll(): Promise<IStudent[]> {
    return await this.studentRepository.getAll()
  }

  async getByName(name: string): Promise<IStudent[]> {
    return await this.studentRepository.getByName(name)
  }

  async getByRa(id: number): Promise<IStudent | null> {
    return await this.studentRepository.getByRa(id)
  }

  async update(student: any): Promise<IStudent> {
    return await this.studentRepository.update(student)
  }

  async delete(studentRa: number): Promise<IStudent> {
    return await this.studentRepository.delete(studentRa)
  }
}
