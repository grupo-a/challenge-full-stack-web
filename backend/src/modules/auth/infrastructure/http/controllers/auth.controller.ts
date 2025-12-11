import { Request, Response } from "express";
import { loginSchema } from "../dtos/login.dto";
import { registerSchema } from "../dtos/register.dto";
import { LoginUseCase } from "@/modules/auth/application/usecases/login.usecase";
import { RegisterUseCase } from "@/modules/auth/application/usecases/register.usecase";

export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase
  ) {}

  async login(req: Request, res: Response): Promise<Response> {
    const validatedData = loginSchema.parse(req.body);

    const result = await this.loginUseCase.execute(validatedData);

    return res.status(200).json(result);
  }

  async register(req: Request, res: Response): Promise<Response> {
    const validatedData = registerSchema.parse(req.body);

    const result = await this.registerUseCase.execute(validatedData);

    return res.status(201).json(result);
  }
}
