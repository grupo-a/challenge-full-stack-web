import jsonwebtoken from "jsonwebtoken"
import { CreateLoginService } from "./CreateLoginService"
import { prismaMock } from "@tests/singleton"
import { User } from "@prisma/client"
import { HashProvider } from "@providers/HashProvider"
import HttpError from "@errors/HttpError"

describe("CreateLoginService", () => {
	const user = {
		id: "9038aca1-a1c0-49c0-9e9c-d6638bc25531",
		name: "Rich",
		email: "hello@prisma.io",
		isAdmin: true,
		password: "password",
	} as User

	test("should be able do login", async () => {
		const jwt =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

		const compareHashMock = jest.spyOn(HashProvider, "compareHash")
		compareHashMock.mockImplementation(
			(_payload: string, _hashed: string) => Promise.resolve(true),
		)

		const singMock = jest.spyOn(jsonwebtoken, "sign")
		singMock.mockImplementation(
			(_payload: any, _secretOrPrivateKey: any, _options?: any) => jwt,
		)

		prismaMock.user.findFirst.mockResolvedValue(user)

		await expect(
			CreateLoginService.execute({
				email: "hello@prisma.io",
				password: "password",
			}),
		).resolves.toEqual({
			accessToken: jwt,
		})
	})

	test("should not be able to login when password is wrong", async () => {
		const compareHashMock = jest.spyOn(HashProvider, "compareHash")
		compareHashMock.mockImplementation(
			(_payload: string, _hashed: string) => Promise.resolve(false),
		)

		prismaMock.user.findFirst.mockResolvedValue(user)

		const res = CreateLoginService.execute({
			email: "hello@prisma.io",
			password: "87654321",
		})

		await expect(res).rejects.toBeInstanceOf(HttpError)
		await expect(res).rejects.toHaveProperty("status", 401)
	})

	test("should not be able to login when email not exists", async () => {
		prismaMock.user.findFirst.mockResolvedValue(null)

		const res = CreateLoginService.execute({
			email: "hello@prisma.io",
			password: "87654321",
		})

		await expect(res).rejects.toBeInstanceOf(HttpError)
		await expect(res).rejects.toHaveProperty("status", 401)
	})
})
