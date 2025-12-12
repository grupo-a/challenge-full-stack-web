import { IUserRepository } from "@/modules/user/application/repositories/user.repository";
import { NotFoundError } from "@/common/domain/errors/not-found-error";

interface GetProfileResponse {
  id: string;
  email: string;
  role: string;
}

export class GetProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<GetProfileResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
