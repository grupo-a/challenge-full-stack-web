import pino from "pino"
import pretty from "pino-pretty"
import { env } from "./app"

const logger = pino(
	{
		level: env.LOG_LEVEL,
		timestamp: false,
	},
	pretty({
		levelFirst: true,
		ignore: "pid,hostname",
		translateTime: true,
	}),
)

export default logger
