import { IStudent } from '../interfaces/IStudent'
import { IStudentRepository } from '../interfaces/IStudentRepository'
import { studentMock } from './studentMock'

export class StudentRepositoryMock implements IStudentRepository {
  async add(): Promise<IStudent> {
    return studentMock
  }

  async getByName(): Promise<IStudent[]> {
    return [studentMock]
  }

  async getByRa(): Promise<IStudent> {
    return studentMock
  }

  async getAll(): Promise<IStudent[]> {
    return [studentMock]
  }

  async update(): Promise<IStudent> {
    return studentMock
  }

  async delete(): Promise<IStudent> {
    return studentMock
  }
}
