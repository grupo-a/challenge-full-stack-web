import { FindStudentService } from "./FindStudentService"
import { prismaMock } from "@tests/singleton"
import { Student } from "@prisma/client"

describe("FindStudentService", () => {
	test("should be able to find students", async () => {
		const date = new Date()
		const count = 10
		const students = [
			{
				id: "d6638bc25531-a1c0-49c0-9e9c-9038aca1",
				name: "Natasha",
				email: "nat@black.com",
				ra: 101102,
				cpf: "99999999999",
				createdAt: date,
				updatedAt: date,
			},
			{
				id: "9038aca1-a1c0-49c0-9e9c-d6638bc25531",
				name: "Tony Stark",
				email: "tony@stark.com",
				ra: 101101,
				cpf: "99999999999",
				createdAt: date,
				updatedAt: date,
			},
		] as Student[]
		prismaMock.student.count.mockResolvedValue(count)
		prismaMock.student.findMany.mockResolvedValue(students)

		const res = FindStudentService.execute({})
		await expect(res).resolves.toEqual({
			students,
			count,
		})
		expect(prismaMock.student.count).toBeCalled()
		expect(prismaMock.student.findMany).toBeCalled()
	})
})
