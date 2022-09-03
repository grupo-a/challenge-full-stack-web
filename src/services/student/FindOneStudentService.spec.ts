import { FindOneStudentService } from "./FindOneStudentService"
import { prismaMock } from "@tests/singleton"
import { Student } from "@prisma/client"
import HttpError from "@errors/HttpError"

describe("FindOneStudentService", () => {
	test("should be able to find a student", async () => {
		const date = new Date()
		const student = {
			id: "9038aca1-a1c0-49c0-9e9c-d6638bc25531",
			name: "Tony Stark",
			email: "tony@stark.com",
			ra: 101101,
			cpf: "99999999999",
			createdAt: date,
			updatedAt: date,
		} as Student
		prismaMock.student.findUnique.mockResolvedValue(student)

		const res = FindOneStudentService.execute({ studentId: student.id })
		await expect(res).resolves.toEqual({
			student,
		})
		expect(prismaMock.student.findUnique).toBeCalledWith({
			where: { id: student.id },
		})
	})

	test("should not be able to find a student when the id doesn't exist", async () => {
		const studentId = "9038aca1-a1c0-49c0-9e9c-d6638bc25531"
		prismaMock.user.findUnique.mockResolvedValue(null)
		const res = FindOneStudentService.execute({ studentId })

		expect(prismaMock.student.findUnique).toBeCalledWith({
			where: { id: studentId },
		})
		await expect(res).rejects.toBeInstanceOf(HttpError)
		await expect(res).rejects.toHaveProperty("status", 404)
	})
})
