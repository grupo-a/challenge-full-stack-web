import { Request, Response, NextFunction } from 'express'

function verifyUserPermission(req: Request, res: Response, next: NextFunction) {
    try {
        const { role } = req.user

        if (role !== 'ADMIN') return res.status(401).json({ message: 'Unauthorized' })

        return next()
    } catch (error) {
        return res.status(401).json({ errorCode: 'Unauthorized' })
    }
}

export { verifyUserPermission }
