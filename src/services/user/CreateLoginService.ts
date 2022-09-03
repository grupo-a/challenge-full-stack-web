import jwt from "jsonwebtoken"
import prisma from "@config/prisma"
import HttpError from "../../http/errors/HttpError"
import { HashProvider } from "@providers/HashProvider"
import { env } from "@config/app"

interface CreateLoginServiceDTO {
	email: string
	password: string
}

export class CreateLoginService {
	public static async execute({ email, password }: CreateLoginServiceDTO) {
		const user = await prisma.user.findFirst({
			where: { email },
		})
		if (!user || !user.password)
			throw HttpError.unauthorized("Email or password is invalid.")

		const compareHash = await HashProvider.compareHash(
			password,
			user.password,
		)
		if (!compareHash)
			throw HttpError.unauthorized("Email or password is invalid.")

		const token = jwt.sign(
			{ sub: user.id, email: user.email },
			env.JWT_SECRET,
			{
				expiresIn: "12h",
			},
		)

		const expiresIn = new Date()
		expiresIn.setTime(expiresIn.getTime() + 24 * 60 * 60 * 1000)

		return { token, expiresIn: expiresIn.toISOString() }
	}
}
