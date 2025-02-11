import { User } from 'src/auth/interfaces/user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
