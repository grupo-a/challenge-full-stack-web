import { DeleteStudentService } from "./DeleteStudentService"
import { prismaMock } from "@tests/singleton"
import { Student } from "@prisma/client"
import HttpError from "@errors/HttpError"

describe("DeleteStudentService", () => {
	test("should be able delete a student", async () => {
		const studentId = "9038aca1-a1c0-49c0-9e9c-d6638bc25531"

		prismaMock.student.findUnique.mockResolvedValue({
			id: studentId,
		} as Student)
		prismaMock.student.delete.mockResolvedValue({
			id: studentId,
		} as Student)

		const res = DeleteStudentService.execute({ studentId })
		await expect(res).resolves.not.toThrow()
		expect(prismaMock.student.findUnique).toBeCalled()
		expect(prismaMock.student.delete).toBeCalled()
	})

	test("must not be able to delete a student who does not exist", async () => {
		const studentId = "9038aca1-a1c0-49c0-9e9c-d6638bc25531"

		prismaMock.student.findUnique.mockResolvedValue(null)

		const res = DeleteStudentService.execute({ studentId })
		expect(prismaMock.student.findUnique).toBeCalled()
		await expect(res).rejects.toBeInstanceOf(HttpError)
		await expect(res).rejects.toHaveProperty("status", 404)
	})
})
