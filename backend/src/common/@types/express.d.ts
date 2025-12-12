import { UserRole } from "../../modules/user/domain/enums/user-role.enum";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}
