import { Request, Response } from 'express'

import { ListStudentsUseCase } from './list-students-use-case'

class ListStudentsController {
    constructor(private readonly listStudentUseCase: ListStudentsUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const students = await this.listStudentUseCase.execute()

        return res.status(200).json(students)
    }
}

export { ListStudentsController }
