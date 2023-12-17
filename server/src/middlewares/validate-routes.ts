/* eslint-disable func-names */
import { NextFunction, Request, Response } from 'express'
import { ObjectSchema, ValidationError } from 'yup'

import { ITypedRequest } from '../utils/typed-request.interface'

function validateRoutes(
    schema: ObjectSchema<ITypedRequest>
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await schema.validate(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params,
                },
                { strict: true, abortEarly: false }
            )
            next()
        } catch (error) {
            const { name, message, errors } = error as ValidationError
            res.status(406).send({ name, message, errors })
        }
    }
}

export { validateRoutes }
