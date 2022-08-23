import { Request, Response } from "express";
import CreateStudentUseCase from "./CreateStudentUseCase";

export default class CreateStudentController {
  constructor(private createStudentUseCase: CreateStudentUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, ra, cpf } = req.body;
    try {
      await this.createStudentUseCase.execute({
        name,
        email,
        ra,
        cpf,
      });
  
      return res.status(201).json({ message: "User created with success"});
    } catch (error) {
      return res.status(404).json({ message: "User already Exists"});
    }
  };
}