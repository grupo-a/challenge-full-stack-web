import { Request, Response } from 'express'

import { CreateUserUseCase } from './create-user-use-case'

class CreateUserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { email, username, password, role } = req.body

            await this.createUserUseCase.execute({ email, username, password, role })

            return res.status(201).send()
        } catch (error) {
            console.error(error)
            return res.status(400).send(error)
        }
    }
}

export { CreateUserController }
