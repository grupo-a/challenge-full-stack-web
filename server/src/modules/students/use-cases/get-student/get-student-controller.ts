import { type Request, type Response } from 'express'

import { type GetStudentUseCase } from './get-student-use-case'

class GetStudentController {
    constructor(private readonly getStudentUseCase: GetStudentUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params

            const student = await this.getStudentUseCase.execute(id)

            return res.status(200).json(student)
        } catch (error) {
            console.error(error)
            return res.status(400).send(error)
        }
    }
}

export { GetStudentController }
