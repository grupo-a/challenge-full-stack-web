import { type Request, type Response } from 'express'

import { type DeleteStudentUseCase } from './delete-student-use-case'

class DeleteStudentController {
    constructor(private readonly deleteStudentUseCase: DeleteStudentUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params

            const student = await this.deleteStudentUseCase.execute(id)

            return res.status(204).json(student)
        } catch (error) {
            console.error(error)
            return res.status(400).send(error)
        }
    }
}

export { DeleteStudentController }
