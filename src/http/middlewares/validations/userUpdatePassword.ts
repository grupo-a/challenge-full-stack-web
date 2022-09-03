import Joi from "joi"
import validateMiddleware from "./validate.middleware"

interface TSchema {
	oldPassword: string
	newPassword: string
}

export const userUpdatePassword = validateMiddleware<TSchema>(
	Joi.object<TSchema>({
		oldPassword: Joi.string().min(8).max(20).required(),
		newPassword: Joi.string().min(8).max(20).required(),
	}),
)
