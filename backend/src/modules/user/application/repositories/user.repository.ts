import { User } from "@/modules/user/domain/entities/user.entity";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User | null>;
}
