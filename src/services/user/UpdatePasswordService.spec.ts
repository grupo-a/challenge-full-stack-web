import { UpdatePasswordService } from "./UpdatePasswordService"
import { prismaMock } from "@tests/singleton"
import { User } from "@prisma/client"
import { HashProvider } from "@providers/HashProvider"
import HttpError from "@errors/HttpError"

describe("UpdatePasswordService", () => {
	const user = {
		id: "9038aca1-a1c0-49c0-9e9c-d6638bc25531",
		password: "hashPassword",
	} as User

	test("should be able update user password", async () => {
		const compareHashMock = jest.spyOn(HashProvider, "compareHash")
		compareHashMock.mockImplementation(
			(_payload: string, _hashed: string) => Promise.resolve(true),
		)
		const generateHashMock = jest.spyOn(HashProvider, "generateHash")
		generateHashMock.mockImplementation((_payload: string) =>
			Promise.resolve("hashPassword"),
		)

		prismaMock.user.findUnique.mockResolvedValue(user)
		prismaMock.user.update.mockResolvedValue(user)

		const res = UpdatePasswordService.execute({
			userId: user.id,
			newPassword: "12345678",
			oldPassword: "12349872",
		})
		await expect(res).resolves.not.toThrow()
		expect(compareHashMock).toBeCalled()
		expect(generateHashMock).toBeCalled()
	})

	test("should not be able to login when old password is wrong", async () => {
		const compareHashMock = jest.spyOn(HashProvider, "compareHash")
		compareHashMock.mockImplementation(
			(_payload: string, _hashed: string) => Promise.resolve(false),
		)
		prismaMock.user.findUnique.mockResolvedValue(user)

		const res = UpdatePasswordService.execute({
			userId: user.id,
			newPassword: "12345678",
			oldPassword: "12349872",
		})

		await expect(res).rejects.toBeInstanceOf(HttpError)
		await expect(res).rejects.toHaveProperty("status", 401)
		expect(compareHashMock).toBeCalled()
		expect(prismaMock.user.findUnique).toBeCalled()
	})

	test("shouldn't be able to find a user when the id doesn't exist", async () => {
		prismaMock.user.findUnique.mockResolvedValue(null)

		const res = UpdatePasswordService.execute({
			userId: user.id,
			newPassword: "12345678",
			oldPassword: "12349872",
		})
		await expect(res).rejects.toBeInstanceOf(HttpError)
		await expect(res).rejects.toHaveProperty("status", 404)
	})
})
