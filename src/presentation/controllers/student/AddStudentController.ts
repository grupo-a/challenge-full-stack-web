import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { tokens } from '../../../di/Tokens'
import { IStudentService } from '../../../application/service/interfaces/IStudentService'
import { MissingParamError } from '../../errors/MissingParamError'
import { badRequest, created, serverError } from '../../helpers/HttpHelper'
import { IController } from '../../protocols/IController'
import { HttpRequest, HttpResponse } from '../../protocols/IHttp'

@injectable()
export class AddStudentController implements IController {
  constructor(
    @inject(tokens.StudentService)
    private readonly studentService: IStudentService,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { nome, email, ra, cpf, isActive } = httpRequest.body
    try {
      // TODO: Utilizar a lib joy para validar
      if (!nome || !email || !ra || !cpf || !isActive) {
        // TODO: Melhorar a verificação
        return badRequest(new MissingParamError('Todos os dados devem ser preenchidos'))
      }

      const result = await this.studentService.add({ nome, email, ra, cpf, isActive })
      return created(result)
    } catch (error) {
      return serverError()
    }
  }
}
