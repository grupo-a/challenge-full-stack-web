import "express-async-errors"
import express, { Request, Response, NextFunction } from "express"

import logger from "@config/logger"

import routes from "./routes"
import HttpError from "./errors/HttpError"
import { HttpStatusCode } from "@helpers/httpStatusCode"

export default () => {
	const app = express()

	app.use(routes())

	app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
		if (err instanceof HttpError)
			return res.status(err.status).json(err.message)

		logger.error(err)

		return res
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
			.json("Internal server error")
	})

	return app
}
