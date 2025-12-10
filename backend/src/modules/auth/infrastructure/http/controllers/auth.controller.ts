import { Request, Response } from "express";
import { loginSchema } from "../dtos/login.dto";
import { LoginUseCase } from "@/modules/auth/application/usecases/login.usecase";

export class AuthController {
    constructor(private loginUseCase: LoginUseCase) { }

    async login(req: Request, res: Response): Promise<Response> {
        const validatedData = loginSchema.parse(req.body);

        const result = await this.loginUseCase.execute(validatedData);

        return res.status(200).json(result);
    }
}
