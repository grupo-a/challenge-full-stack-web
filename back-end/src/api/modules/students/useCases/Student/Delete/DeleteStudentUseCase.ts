import IStudentRepository from "../../../repositories/interfaces/IStudentRepository";

interface IRequest {
  ra: string;
};

export default class DeleteStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  public async execute({
    ra,
  }: IRequest): Promise<void> {
    const checkStudentExistance = await this.studentRepository.findByRa(ra);

    if(!checkStudentExistance) {
      throw new Error("Student doesn't exist");
    }
    this.studentRepository.destroy(ra);
  }
}