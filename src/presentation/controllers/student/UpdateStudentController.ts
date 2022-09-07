import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { tokens } from '../../../di/Tokens'
import { IStudentService } from '../../../application/service/interfaces/IStudentService'
import { ok, serverError } from '../../helpers/HttpHelper'
import { IController } from '../../protocols/IController'
import { HttpRequest, HttpResponse } from '../../protocols/IHttp'

@injectable()
export class UpdateStudentController implements IController {
  constructor(
    @inject(tokens.StudentService)
    private readonly studentService: IStudentService,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { nome, email, ra, cpf, isActive } = httpRequest.body

    try {
      const result = await this.studentService.update({ nome, email, ra, cpf, isActive })
      return ok(result)
    } catch (error) {
      return serverError()
    }
  }
}
