import { Request, Response } from "express"
import { FindUserService } from "@services/user/FindUserService"

export class MeController {
	public static async get({ user: { id } }: Request, res: Response) {
		const {
			user: { name, email, isAdmin, createdAt },
		} = await FindUserService.execute(id)

		return res.json({ me: { name, email, isAdmin, createdAt } })
	}
}
