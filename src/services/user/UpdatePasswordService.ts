import prisma from "@config/prisma"
import HttpError from "../../http/errors/HttpError"
import { HashProvider } from "@providers/HashProvider"

interface UpdatePasswordServiceDTO {
	oldPassword: string
	newPassword: string
}

export class UpdatePasswordService {
	public static async execute(
		userId: string,
		{ oldPassword, newPassword }: UpdatePasswordServiceDTO,
	) {
		const user = await prisma.user.findUnique({
			where: { id: userId as any },
		})
		if (!user) throw HttpError.badRequest("User not found")

		const comparePassword = await HashProvider.compareHash(
			oldPassword,
			user.password,
		)
		if (!comparePassword)
			throw HttpError.unauthorized("passwords do not match")

		const hashedPassword = await HashProvider.generateHash(newPassword)

		await prisma.user.update({
			where: { id: userId as any },
			data: {
				password: hashedPassword,
			},
		})
	}
}
