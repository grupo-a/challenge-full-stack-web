import Joi from "joi"
import validateMiddleware from "./validate.middleware"

interface TSchema {
	name: string
	email: string
}

export const updateStudent = validateMiddleware<TSchema>(
	Joi.object<TSchema>({
		name: Joi.string().min(3).max(255),
		email: Joi.string().min(3).max(255),
	}),
)
