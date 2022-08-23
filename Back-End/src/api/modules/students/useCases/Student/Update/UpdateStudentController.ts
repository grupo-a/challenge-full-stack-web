import { Request, Response } from "express";
import UpdateStudentUseCase from "./UpdateStudentUseCase";

export default class UpdateStudentController {
  constructor(private updateStudentUseCase: UpdateStudentUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, cpf } = req.body;
    const { ra } = req.params;

    try {
      await this.updateStudentUseCase.execute({
        name,
        email,
        ra,
        cpf,
      });
      return res.status(201).json({ message: "User updated with success" })
    } catch (error) {
      return res.status(404).json({ message: "Student doesn't exist"});
    }
  }
}