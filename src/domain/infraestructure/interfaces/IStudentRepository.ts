import { IStudent } from './IStudent'

export interface IStudentRepository {
  add: (student: IStudent) => Promise<IStudent>
  getByName: (name: string) => Promise<IStudent[]>
  getByRa: (ra: number) => Promise<IStudent | null>
  getAll: () => Promise<IStudent[]>
  update: (student: IStudent) => Promise<IStudent>
  delete: (studentRa: number) => Promise<IStudent>
}
