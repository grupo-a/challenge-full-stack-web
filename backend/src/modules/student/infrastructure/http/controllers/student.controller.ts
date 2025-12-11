import { Request, Response } from "express";
import { createStudentSchema } from "../dtos/create-student.dto";
import { updateStudentSchema } from "../dtos/update-student.dto";
import { listStudentsSchema } from "../dtos/list-students.dto";
import { CreateStudentUseCase } from "@/modules/student/application/usecases/create-student.usecase";
import { ListStudentsUseCase } from "@/modules/student/application/usecases/list-students.usecase";
import { GetStudentByIdUseCase } from "@/modules/student/application/usecases/get-student-by-id.usecase";
import { UpdateStudentUseCase } from "@/modules/student/application/usecases/update-student.usecase";
import { DeleteStudentUseCase } from "@/modules/student/application/usecases/delete-student.usecase";
import { BadRequestError } from "@/common/domain/errors/bad-request-error";

export class StudentController {
  constructor(
    private createStudentUseCase: CreateStudentUseCase,
    private listStudentsUseCase: ListStudentsUseCase,
    private getStudentByIdUseCase: GetStudentByIdUseCase,
    private updateStudentUseCase: UpdateStudentUseCase,
    private deleteStudentUseCase: DeleteStudentUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const validatedData = createStudentSchema.parse(req.body);

    const result = await this.createStudentUseCase.execute(validatedData);

    return res.status(201).json(result);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const validatedQuery = listStudentsSchema.parse(req.query);

    const result = await this.listStudentsUseCase.execute(validatedQuery);

    return res.status(200).json(result);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError("Student id is required");
    }

    const result = await this.getStudentByIdUseCase.execute(id);

    return res.status(200).json(result);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError("Student id is required");
    }

    const validatedData = updateStudentSchema.parse(req.body);

    const result = await this.updateStudentUseCase.execute({
      id,
      ...validatedData,
    });

    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError("Student id is required");
    }

    await this.deleteStudentUseCase.execute(id);

    return res.status(204).send();
  }
}
