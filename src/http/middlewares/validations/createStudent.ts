import Joi from "joi"
import validateMiddleware from "./validate.middleware"

interface TSchema {
	name: string
	email: string
	ra: number
	cpf: string
}

export const createStudent = validateMiddleware<TSchema>(
	Joi.object<TSchema>({
		name: Joi.string().min(3).max(255).required(),
		email: Joi.string().min(3).max(255).required(),
		ra: Joi.number().min(1).max(999999).required(),
		cpf: Joi.string()
			.length(11)
			.regex(/^\d{11}$/)
			.required(),
	}),
)
