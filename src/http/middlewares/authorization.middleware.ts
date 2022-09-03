import { NextFunction, Request, Response } from "express"
import HttpError from "@errors/HttpError"

export const authorizationMiddleware =
	(isAdmin: boolean) =>
	({ user }: Request, _res: Response, next: NextFunction) => {
		if (!user) throw HttpError.forbidden("User does not have permission")

		if (isAdmin && !user.isAdmin)
			throw HttpError.forbidden("User does not have permission")

		return next()
	}
