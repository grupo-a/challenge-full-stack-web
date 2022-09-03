import { FindOneUserService } from "./FindOneUserService"
import { prismaMock } from "@tests/singleton"
import { User } from "@prisma/client"
import HttpError from "@errors/HttpError"

describe("FindOneUserService", () => {
	test("should be able to find a user", async () => {
		const date = new Date()
		const user: User = {
			id: "9038aca1-a1c0-49c0-9e9c-d6638bc25531",
			name: "Rich",
			email: "hello@prisma.io",
			isAdmin: true,
			password: "password",
			createdAt: date,
			updatedAt: date,
		}
		prismaMock.user.findUnique.mockResolvedValue(user)

		await expect(FindOneUserService.execute(user.id)).resolves.toEqual({
			user: {
				id: "9038aca1-a1c0-49c0-9e9c-d6638bc25531",
				name: "Rich",
				email: "hello@prisma.io",
				isAdmin: true,
				password: "password",
				createdAt: date,
				updatedAt: date,
			},
		})
	})

	test("shouldn't be able to find a user when the id doesn't exist", async () => {
		const userId = "9038aca1-a1c0-49c0-9e9c-d6638bc25531"
		prismaMock.user.findUnique.mockResolvedValue(null)

		const res = FindOneUserService.execute(userId)
		await expect(res).rejects.toBeInstanceOf(HttpError)
		await expect(res).rejects.toHaveProperty("status", 404)
	})
})
