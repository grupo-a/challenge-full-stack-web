import { Request, Response } from 'express'

import { GetStudentUseCase } from './get-student-use-case'

class GetStudentController {
    constructor(private readonly getStudentUseCase: GetStudentUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        const student = await this.getStudentUseCase.execute(id)

        return res.status(200).json(student)
    }
}

export { GetStudentController }
