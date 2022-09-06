import { IStudent } from '../../../domain/infraestructure/interfaces/IStudent'
import { studentMock } from '../../../domain/infraestructure/mocks/studentMock'
import { IStudentService } from '../interfaces/IStudentService'

export class StudentServiceMock implements IStudentService {
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
