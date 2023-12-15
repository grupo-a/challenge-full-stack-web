import { Request, Response } from 'express'

import { CreateStudentUseCase } from './create-student-use-case'

class CreateStudentController {
    constructor(private readonly createStudentUseCase: CreateStudentUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, ra, cpf } = req.body

            await this.createStudentUseCase.execute({ name, email, ra, cpf })

            return res.status(201).send()
        } catch (error) {
            console.error(error)
            return res.status(400).send(error)
        }
    }
}

export { CreateStudentController }
