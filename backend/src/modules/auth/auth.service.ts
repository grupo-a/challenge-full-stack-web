import { Auth } from './interfaces/auth';
import { AuthRepository } from './auth.repository';
import { ERRORS_DESCRIPTION } from '../../common/errors/errors.enum';
import * as jwt from 'jsonwebtoken';

export class AuthService {
  private static EXPIRES_IN_ONE_DAY = 86400;

  constructor(private readonly repository: AuthRepository) {}

  async signIn(args: Auth): Promise<string> {
    const found = await this.repository.getByEnrolment(args.enrolment);
    if (found.password === args.password) return this.generateToken(found.id);
    throw new Error(ERRORS_DESCRIPTION.UNAUTHORIZED);
  }

  async generateToken(id: string) {
    return jwt.sign({ id }, process.env.SECRET, {
      expiresIn: AuthService.EXPIRES_IN_ONE_DAY,
    });
  }
}
