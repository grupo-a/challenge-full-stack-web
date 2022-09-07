import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export default function validator(schema: Joi.Schema, options?: Joi.ValidationOptions) {
  return function (req: Request, res: Response, next: NextFunction) {
    const defaultOptions = {
      abortEarly: false,
      stripUnknown: { objects: true },
    }

    const { error } = schema.validate(req, Object.assign(defaultOptions, options))

    if (error) {
      return res.status(400).json(error.message)
    }

    return next()
  }
}
