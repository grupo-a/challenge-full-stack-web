import { BadRequestError } from "@/common/domain/errors/bad-request-error";
import { RegisterDTO } from "../../infrastructure/http/dtos/register.dto";
import { UnprocessableEntityError } from "@/common/domain/errors/unprocessable-entity-error";
import { IUserRepository } from "@/modules/user/application/repositories/user.repository";
import { User } from "@/modules/user/domain/entities/user.entity";
import { UserRole } from "@/modules/user/domain/enums/user-role.enum";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface RegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: RegisterDTO): Promise<RegisterResponse> {
    if (dto.password !== dto.confirmPassword) {
      throw new UnprocessableEntityError([
        {
          field: "confirmPassword",
          message: "Password confirmation does not match password",
        },
      ]);
    }

    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new UnprocessableEntityError([
        {
          field: "email",
          message: "Email already in use",
        },
      ]);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = User.create({
      email: dto.email,
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    const createdUser = await this.userRepository.create(user);

    if (!createdUser) {
      throw new BadRequestError("Failed to create user");
    }

    const token = jwt.sign(
      {
        id: createdUser.id,
        role: createdUser.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      user: {
        id: createdUser.id,
        email: createdUser.email,
        role: createdUser.role,
      },
    };
  }
}
