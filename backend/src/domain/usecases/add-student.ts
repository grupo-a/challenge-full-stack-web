import { IStudentModel } from '../models/student'
export interface IAddStudentModel {
  name: string
  email: string
  ra: string
  cpf: string
}

export interface IAddStudent {
  add: (student: IAddStudentModel) => Promise<IStudentModel>
}
