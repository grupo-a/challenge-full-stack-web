import prisma from "@config/prisma"
import HttpError from "@errors/HttpError"

export class FindOneUserService {
	public static async execute(userId: string) {
		const user = await prisma.user.findUnique({ where: { id: userId } })
		if (!user) throw HttpError.notFound("User not found")

		return { user }
	}
}
