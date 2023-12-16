import { NextFunction, Request, Response } from 'express'

import { AppErrorHandler } from '../errors/app-error-handler'

const errorHandler = (err: Error & Partial<AppErrorHandler>, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err)

    if (err instanceof AppErrorHandler) {
        return res.status(err.statusCode).json({
            errorMessage: err.message,
            statusCode: err.statusCode,
        })
    }

    return res.status(500).json({
        errorMessage: JSON.stringify(err.message),
        statusCode: 500,
    })
}

export { errorHandler }
