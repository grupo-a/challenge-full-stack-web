import Joi from "joi"
import validateMiddleware from "./validate.middleware"

interface TSchema {
	email: string
	password: string
}

export const login = validateMiddleware<TSchema>(
	Joi.object<TSchema>({
		email: Joi.string().min(3).max(100).required(),
		password: Joi.string().min(8).max(20).required(),
	}),
)
