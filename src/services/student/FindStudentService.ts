import prisma from "@config/prisma"
import { Student, Prisma } from "@prisma/client"
interface IFindStudentServiceDTO {
	q?: string
	take?: number
	skip?: number
}

export class FindStudentService {
	public static async execute({ q, skip, take }: IFindStudentServiceDTO) {
		let queryFilter
		if (q)
			queryFilter = {
				OR: [
					{ name: { contains: q, mode: "insensitive" } },
					{ email: q },
					{ ra: Number(q) || undefined },
					{ cpf: q },
				],
			} as Prisma.StudentWhereInput

		const count = await prisma.student.count({
			where: queryFilter,
		})

		let students: Student[] = []
		if (count)
			students = await prisma.student.findMany({
				where: queryFilter,
				skip: Number(skip) || 0,
				take: Number(take) || 10,
			})

		return { students, count }
	}
}
