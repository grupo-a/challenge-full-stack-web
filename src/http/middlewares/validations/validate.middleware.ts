import { Request, Response, NextFunction } from "express"
import { AnySchema } from "joi"
import HttpError from "@errors/HttpError"

export default <TSchema>(schema: AnySchema<TSchema>) =>
	(req: Request, res: Response, next: NextFunction) => {
		const { error, value } = schema.validate(req.body)

		if (error) throw new HttpError(422, error.message)

		req.body = value
		next()
	}
