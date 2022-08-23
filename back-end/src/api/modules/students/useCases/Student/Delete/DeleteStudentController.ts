import { Request, Response } from "express";
import DeleteStudentUseCase from "./DeleteStudentUseCase";

export default class DeleteStudentController {
  constructor(private deleteStudentUseCase: DeleteStudentUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { ra } = req.params;

    try {
      await this.deleteStudentUseCase.execute({
        ra,
      });
      return res.status(200).json({ message: "User deleted with success" })
    } catch (error) {
      return res.status(404).json({ message: "Student doesn't exist"});
    }
  }
}