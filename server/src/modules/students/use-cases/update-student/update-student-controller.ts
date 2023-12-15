import { Request, Response } from 'express'

import { UpdateStudentUseCase } from './update-student-use-case'

class UpdateStudentController {
    constructor(private readonly updateStudentUseCase: UpdateStudentUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const { name, email } = req.body

            await this.updateStudentUseCase.execute({ id, name, email })

            return res.status(204).send()
        } catch (error) {
            console.error(error)
            return res.status(400).send(error)
        }
    }
}

export { UpdateStudentController }
