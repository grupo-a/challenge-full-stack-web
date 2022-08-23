import IStudentRepository from "../../../repositories/interfaces/IStudentRepository";

interface IResponse {
  name: string,
  email: string;
  ra: string;
  cpf: string;
}

export default class ListStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  public async execute(): Promise<IResponse[]> {
    const students = await this.studentRepository.list();
    return students;
  }
}