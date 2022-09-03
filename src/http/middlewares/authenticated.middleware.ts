import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { env } from "@config/app"
import logger from "@config/logger"
import HttpError from "@errors/HttpError"

interface TokenPayload {
	iat: number
	exp: number
	sub: string
	isAdmin: boolean
}

export const authenticatedMiddleware =
	() => (req: Request, _res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization

		if (!authHeader) {
			throw HttpError.unauthorized("JWT token is missing")
		}

		const [, token] = authHeader.split(" ")

		try {
			const decoded = verify(token, env.JWT_SECRET)

			const { sub, isAdmin } = decoded as TokenPayload

			req.user = {
				id: sub,
				isAdmin,
			}

			logger.debug(
				"[authenticatedMiddleware] " + JSON.stringify(req.user),
			)

			return next()
		} catch {
			throw HttpError.unauthorized("Invalid JWT token")
		}
	}
