import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { ITokenPayload } from '../adapters/user/user-login-dto.interface'
import { AppErrorHandler } from '../errors/app-error-handler'
import { UnauthorizedError } from '../errors/unauthorized-error'

function confirmAuthenticity(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization

    if (!authToken) {
        throw new UnauthorizedError('Invalid token')
    }

    const [, token] = authToken.split(' ')

    const secret = process.env.JWT_SECRET
    if (!secret) throw new UnauthorizedError('Invalid JWT secret')

    try {
        const { id, email, role } = verify(token, secret) as ITokenPayload

        req.user = { id, email, role }

        return next()
    } catch (error) {
        throw new AppErrorHandler(JSON.stringify(error), 500)
    }
}

export { confirmAuthenticity }
