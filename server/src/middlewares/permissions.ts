import { Request, Response, NextFunction } from 'express'

import { UnauthorizedError } from '../errors/unauthorized-error'

function verifyUserPermission(req: Request, res: Response, next: NextFunction) {
    const { role } = req.user

    if (role !== 'ADMIN') throw new UnauthorizedError('User does not have permissions to perform this action')

    return next()
}

export { verifyUserPermission }
