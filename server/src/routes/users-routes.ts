import { Request, Response, Router } from 'express'

import { createUserController } from '../modules/users/use-cases/create-user'
import { userLoginController } from '../modules/users/use-cases/user-login'

const usersRoutes = Router()

usersRoutes.post('/', (req: Request, res: Response) => {
    return createUserController.handle(req, res)
})

usersRoutes.post('/login', (req: Request, res: Response) => {
    return userLoginController.handle(req, res)
})

export { usersRoutes }
