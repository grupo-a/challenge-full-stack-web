import { inject, injectable } from 'tsyringe'
import { tokens } from '../../../di/Tokens'
import { StudentService } from '../../application/service/StudentService'
import { ok, serverError } from '../helpers/HttpHelper'
import { IController } from '../protocols/IController'
import { HttpRequest, HttpResponse } from '../protocols/IHttp'

@injectable()
export class GetAllStudentsController implements IController {
  constructor(
    @inject(tokens.StudentService)
    private readonly studentService: StudentService,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.studentService.getAll()

      return ok(result)
    } catch (error) {
      return serverError()
    }
  }
}
