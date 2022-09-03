import prisma from "@config/prisma"
import HttpError from "@errors/HttpError"

interface DeleteStudentServiceDTO {
	studentId: string
}

export class DeleteStudentService {
	public static async execute({ studentId }: DeleteStudentServiceDTO) {
		const student = await prisma.student.findUnique({
			where: { id: studentId },
		})
		if (!student) throw HttpError.notFound("Student not found")

		await prisma.student.delete({
			where: { id: studentId },
		})
	}
}
