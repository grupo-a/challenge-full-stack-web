import { UserRole } from "../modules/users/domain/enums/user-role.enum";

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: number;
      };
    }
  }
}
