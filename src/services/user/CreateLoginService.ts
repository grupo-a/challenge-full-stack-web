import jwt from "jsonwebtoken"
import prisma from "@config/prisma"
import HttpError from "@errors/HttpError"
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
		if (!user) throw HttpError.unauthorized("Email or password is invalid.")

		const compareHash = await HashProvider.compareHash(
			password,
			user.password,
		)
		if (!compareHash)
			throw HttpError.unauthorized("Email or password is invalid.")

		const token = jwt.sign(
			{ sub: user.id, isAdmin: user.isAdmin },
			env.JWT_SECRET,
			{
				expiresIn: "12h",
			},
		)

		return { accessToken: token }
	}
}
