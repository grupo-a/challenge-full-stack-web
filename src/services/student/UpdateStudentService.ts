import prisma from "@config/prisma"
import HttpError from "@errors/HttpError"

interface UpdateStudentServiceDTO {
	studentId: string
	name: string
	email: string
}

export class UpdateStudentService {
	public static async execute({
		studentId,
		...data
	}: UpdateStudentServiceDTO) {
		const student = await prisma.student.findUnique({
			where: { id: studentId },
		})
		if (!student) throw HttpError.notFound("Student not found")

		const emailAlreadyUsed = !!(await prisma.student.count({
			where: { id: { not: studentId }, email: data.email },
		}))
		if (emailAlreadyUsed) throw HttpError.badRequest("Email already used")

		await prisma.student.update({
			where: { id: studentId },
			data,
		})
	}
}
