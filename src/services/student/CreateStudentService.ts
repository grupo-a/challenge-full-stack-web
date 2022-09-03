import prisma from "@config/prisma"
import HttpError from "@errors/HttpError"

interface CreateStudentServiceDTO {
	name: string
	email: string
	ra: number
	cpf: string
}

export class CreateStudentService {
	public static async execute(studentDTO: CreateStudentServiceDTO) {
		const studentAlreadyExists = !!(await prisma.student.count({
			where: {
				OR: [
					{ email: studentDTO.email },
					{ cpf: studentDTO.cpf },
					{ ra: studentDTO.ra },
				],
			},
		}))

		if (studentAlreadyExists)
			throw HttpError.badRequest("Student already exists")

		const { id } = await prisma.student.create({
			data: studentDTO,
		})

		return { studentId: id }
	}
}
