import { Request, Response } from 'express'

import { UpdateStudentUseCase } from './update-student-use-case'

class UpdateStudentController {
    constructor(private readonly updateStudentUseCase: UpdateStudentUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const { name, email } = req.body

        await this.updateStudentUseCase.execute({ id, name, email })

        return res.status(204).send()
    }
}

export { UpdateStudentController }
