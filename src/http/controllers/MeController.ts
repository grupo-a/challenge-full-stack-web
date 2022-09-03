import { Request, Response } from "express"
import { FindOneUserService } from "@services/user/FindOneUserService"

export class MeController {
	public static async get({ user: { id } }: Request, res: Response) {
		const {
			user: { name, email, isAdmin, createdAt },
		} = await FindOneUserService.execute(id)

		return res.json({ me: { name, email, isAdmin, createdAt } })
	}
}
