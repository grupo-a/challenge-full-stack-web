import { CreateStudentService } from "./CreateStudentService"
import { prismaMock } from "@tests/singleton"
import { Student } from "@prisma/client"
import HttpError from "@errors/HttpError"

describe("CreateStudentService", () => {
	test("should be able create a student", async () => {
		const studentId = "9038aca1-a1c0-49c0-9e9c-d6638bc25531"

		prismaMock.student.count.mockResolvedValue(0)
		prismaMock.student.create.mockResolvedValue({
			id: studentId,
		} as Student)

		const res = CreateStudentService.execute({
			name: "Tony Stark",
			ra: 101101,
			cpf: "99999999999",
			email: "tony@stark.com",
		})
		await expect(res).resolves.not.toThrow()
		await expect(res).resolves.toEqual({
			studentId,
		})
		expect(prismaMock.student.count).toBeCalled()
		expect(prismaMock.student.create).toBeCalled()
	})

	test("should not be able create a student with same ra, email and cpf", async () => {
		prismaMock.student.count.mockResolvedValue(1)

		const res = CreateStudentService.execute({
			name: "Tony Stark",
			ra: 101101,
			cpf: "99999999999",
			email: "tony@stark.com",
		})

		expect(prismaMock.student.count).toBeCalled()
		await expect(res).rejects.toBeInstanceOf(HttpError)
		await expect(res).rejects.toHaveProperty("status", 400)
	})
})
