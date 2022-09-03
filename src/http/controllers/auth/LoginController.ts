import { Request, Response } from "express"
import { CreateLoginService } from "@services/user/CreateLoginService"

export class LoginController {
	public static async create({ body }: Request, res: Response) {
		const { accessToken } = await CreateLoginService.execute(body)

		return res.json({ accessToken })
	}
}
