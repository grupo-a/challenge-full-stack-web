import { Request, Response } from 'express'

import { DeleteStudentUseCase } from './delete-student-use-case'

class DeleteStudentController {
    constructor(private readonly deleteStudentUseCase: DeleteStudentUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        await this.deleteStudentUseCase.execute(id)

        return res.status(204).send()
    }
}

export { DeleteStudentController }
