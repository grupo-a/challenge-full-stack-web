import { IUserRepository } from "@/modules/users/application/repositories/user.repository";
import { LoginDTO } from "../../infrastructure/http/dtos/login.dto";
import { UnauthorizedError } from "@/common/domain/errors/unauthorized-error";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface LoginResponse {
    token: string;
    user: {
        id: number;
        username: string;
        role: string;
    };
}

export class LoginUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(dto: LoginDTO): Promise<LoginResponse> {
        const user = await this.userRepository.findByUsername(dto.username);

        if (!user) {
            throw new UnauthorizedError("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid credentials");
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                collaboratorId: user.collaboratorId,
            },
            process.env.JWT_SECRET || "default_secret",
            {
                expiresIn: "1d",
            }
        );

        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
            },
        };
    }
}
