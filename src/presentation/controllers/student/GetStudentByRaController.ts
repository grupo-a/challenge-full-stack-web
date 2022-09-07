import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { tokens } from '../../../di/Tokens'
import { IStudentService } from '../../../application/service/interfaces/IStudentService'
import { ok, serverError } from '../../helpers/HttpHelper'
import { IController } from '../../protocols/IController'
import { HttpRequest, HttpResponse } from '../../protocols/IHttp'

@injectable()
export class GetStudentByRaController implements IController {
  constructor(
    @inject(tokens.StudentService)
    private readonly studentService: IStudentService,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { ra } = httpRequest.params
    try {
      const result = await this.studentService.getByRa(ra)
      return ok(result)
    } catch (error) {
      return serverError()
    }
  }
}
