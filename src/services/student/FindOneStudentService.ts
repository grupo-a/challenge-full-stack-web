import prisma from "@config/prisma"
import HttpError from "@errors/HttpError"

interface IFindOneStudentServiceDTO {
	studentId: string
}

export class FindOneStudentService {
	public static async execute({ studentId }: IFindOneStudentServiceDTO) {
		const student = await prisma.student.findUnique({
			where: { id: studentId },
		})
		if (!student) throw HttpError.notFound("Student not found")

		return { student }
	}
}
