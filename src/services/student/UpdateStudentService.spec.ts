import { UpdateStudentService } from "./UpdateStudentService"
import { prismaMock } from "@tests/singleton"
import { Student } from "@prisma/client"
import HttpError from "@errors/HttpError"

describe("UpdateStudentService", () => {
	const studentId = "9038aca1-a1c0-49c0-9e9c-d6638bc25531"

	test("should be able update a student", async () => {
		prismaMock.student.findUnique.mockResolvedValue({
			id: studentId,
		} as Student)
		prismaMock.student.update.mockResolvedValue({
			id: studentId,
		} as Student)

		const res = UpdateStudentService.execute({
			studentId,
			name: "Jonh",
			email: "prismaMock@prisma.com",
		})
		await expect(res).resolves.not.toThrow()
		expect(prismaMock.student.findUnique).toBeCalledWith({
			where: { id: studentId },
		})
		expect(prismaMock.student.update).toBeCalled()
	})

	test("should not be able to find a student when the id doesn't exist", async () => {
		prismaMock.user.findUnique.mockResolvedValue(null)

		const res = UpdateStudentService.execute({
			studentId,
			name: "Jonh",
			email: "prismaMock@prisma.com",
		})
		expect(prismaMock.student.findUnique).toBeCalledWith({
			where: { id: studentId },
		})
		await expect(res).rejects.toBeInstanceOf(HttpError)
		await expect(res).rejects.toHaveProperty("status", 404)
	})

	test("should not be able to update a student when the email is already in use", async () => {
		prismaMock.student.findUnique.mockResolvedValue({
			id: studentId,
		} as Student)
		prismaMock.student.count.mockResolvedValue(1)

		const res = UpdateStudentService.execute({
			studentId,
			name: "Jonh",
			email: "prismaMock@prisma.com",
		})
		await expect(res).rejects.toBeInstanceOf(HttpError)
		await expect(res).rejects.toHaveProperty("status", 400)
		expect(prismaMock.student.count).toBeCalled()
	})
})
