import { User } from '@prisma/client'
import { prisma } from '../../database/PrismaClient'
import { ILoginRepository } from './interfaces/ILoginRepository'

export class LoginRepository implements ILoginRepository {
  async login(user: User): Promise<any> {
    return await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    })
  }
}
