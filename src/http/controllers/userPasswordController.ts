import { Request, Response } from "express"
import { UpdatePasswordService } from "@services/user/UpdatePasswordService"
import { HttpStatusCode } from "@helpers/httpStatusCode"

export const update = async ({ body, user }: Request, res: Response) => {
	await UpdatePasswordService.execute(user.id, body)

	return res.status(HttpStatusCode.NO_CONTENT).send()
}
