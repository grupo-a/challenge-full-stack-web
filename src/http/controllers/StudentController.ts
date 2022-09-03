import { Request, Response } from "express"
import { HttpStatusCode } from "@helpers/httpStatusCode"
import { CreateStudentService } from "@services/student/CreateStudentService"
import { FindStudentService } from "@services/student/FindStudentService"
import { UpdateStudentService } from "@services/student/UpdateStudentService"
import { FindOneStudentService } from "../../services/student/FindOneStudentService"
import { DeleteStudentService } from "../../services/student/DeleteStudentService"

export class StudentController {
	public static async find({ query }: Request, res: Response) {
		const { students, count } = await FindStudentService.execute(query)
		return res.json({ students, count })
	}

	public static async findOne({ params }: Request, res: Response) {
		const { student } = await FindOneStudentService.execute({
			studentId: params.id,
		})
		return res.json({ student })
	}

	public static async create({ body }: Request, res: Response) {
		await CreateStudentService.execute(body)
		return res.status(HttpStatusCode.CREATED).send()
	}

	public static async update({ body, params }: Request, res: Response) {
		await UpdateStudentService.execute({ ...body, studentId: params.id })
		return res.status(HttpStatusCode.NO_CONTENT).send()
	}

	public static async delete({ params }: Request, res: Response) {
		await DeleteStudentService.execute({ studentId: params.id })
		return res.status(HttpStatusCode.NO_CONTENT).send()
	}
}
