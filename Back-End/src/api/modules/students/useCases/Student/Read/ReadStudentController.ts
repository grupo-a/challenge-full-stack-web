import { Request, Response } from "express";
import ReadStudentUseCase from '../Read/ReadStudentUseCase'

export default class ReadStudentController {
  constructor(private readStudentUseCase: ReadStudentUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const read = await this.readStudentUseCase.execute();
      return res.status(200).json(read);
    } catch (error) {
      return res.status(404).json({ message: "Something went wrong" })
    }
  };
}