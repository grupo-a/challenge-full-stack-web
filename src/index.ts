import logger from "@config/logger"
import app from "./http/app"
import prisma from "@config/prisma"
import { Server } from "http"
import { env } from "@config/app"

const PORT = env.PORT
const HOST = "0.0.0.0"

let server: Server

prisma.$connect().finally(() => {
	server = app().listen(PORT, HOST, () => {
		logger.info(`🚀🚀 Server running on http://${HOST}:${PORT}`)
	})
})

function gracefulShutdown(event: string) {
	return async () => {
		try {
			logger.info(`${event} signal received`)
			prisma.$disconnect().finally(() => {
				logger.debug("Database connection closed")

				server.close(() => {
					logger.debug("Http server closed")
					process.exit(0)
				})
			})
		} catch (error: any) {
			logger.fatal(`[gracefulShutdown]: ${error.message}`)
			process.exit(0)
		}
	}
}

process.on("SIGTERM", gracefulShutdown("SIGTERM"))
process.on("SIGINT", gracefulShutdown("SIGINT"))
process.on("uncaughtException", (error, origin) => {
	logger.fatal(`${origin}: ${error.message}`)
})
process.on("unhandledRejection", reason => {
	logger.fatal(`unhandledRejection: ${reason}`)
})
