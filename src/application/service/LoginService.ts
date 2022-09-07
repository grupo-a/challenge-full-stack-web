import { tokens } from '../../di/Tokens'
import { ILoginRepository } from '../../domain/infraestructure/interfaces/ILoginRepository'
import { inject } from 'tsyringe'
import { ILoginService } from './interfaces/ILoginService'

export class LoginService implements ILoginService {
  constructor(
    @inject(tokens.LoginRepository)
    private readonly loginRepository: ILoginRepository,
  ) {}

  async login(user: any): Promise<any> {
    return await this.loginRepository.login(user)
  }
}
