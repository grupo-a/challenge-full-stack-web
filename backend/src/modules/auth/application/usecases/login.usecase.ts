import { LoginDTO } from "../../infrastructure/http/dtos/login.dto";
import { UnauthorizedError } from "@/common/domain/errors/unauthorized-error";
import { IUserRepository } from "@/modules/user/application/repositories/user.repository";
import jwt from "jsonwebtoken";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: LoginDTO): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isPasswordValid = await user.verifyPassword(dto.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
