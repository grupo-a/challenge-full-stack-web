import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { ITokenPayload } from '../adapters/user/user-login-dto.interface'

function confirmAuthenticity(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization

    if (!authToken) {
        return res.status(401).json({
            errorCode: 'token.invalid',
        })
    }

    const [, token] = authToken.split(' ')

    try {
        const secret = process.env.JWT_SECRET
        if (!secret) throw new Error('JWT secret is invalid')

        const { id, email, role } = verify(token, secret) as ITokenPayload

        req.user = { id, email, role }

        return next()
    } catch (error) {
        return res.status(401).json({ errorCode: 'token.expired' })
    }
}

export { confirmAuthenticity }
