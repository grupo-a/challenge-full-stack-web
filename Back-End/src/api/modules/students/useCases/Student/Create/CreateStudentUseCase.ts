import IStudentRepository from "../../../repositories/interfaces/IStudentRepository";

interface IRequest {
  name: string;
  email: string;
  ra: string;
  cpf: string;
};

export default class CreateStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  public async execute({
    name,
    email,
    ra,
    cpf,
  }: IRequest): Promise<void> {
    const checkStudentExistance = await this.studentRepository.findByEmail(email);

    if (checkStudentExistance) {
      throw new Error("Student already exists");
    }

    this.studentRepository.create({
      name,
      email,
      ra,
      cpf,
    });
  }
}