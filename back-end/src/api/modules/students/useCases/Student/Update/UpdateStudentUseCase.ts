import IStudentRepository from "../../../repositories/interfaces/IStudentRepository";

interface IRequest {
  name: string;
  email: string;
  ra: string;
  cpf: string;
};

export default class UpdateStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  public async execute({
    name,
    email,
    ra,
    cpf,
  }: IRequest): Promise<void> {
    const checkStudentExistance = await this.studentRepository.findByRa(ra);

    if(!checkStudentExistance) {
      throw new Error("Student doesn't exist");
    }
    this.studentRepository.update({
      name,
      email,
      ra,
      cpf,
    })
  }
}