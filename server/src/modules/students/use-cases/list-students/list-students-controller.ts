import { type Request, type Response } from 'express'

import { type ListStudentsUseCase } from './list-students-use-case'

class ListStudentsController {
    constructor(private readonly listStudentUseCase: ListStudentsUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const students = await this.listStudentUseCase.execute()

            return res.status(200).json(students)
        } catch (error) {
            console.error(error)
            return res.status(400).send(error)
        }
    }
}

export { ListStudentsController }
