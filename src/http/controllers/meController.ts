import { Request, Response } from "express"
import { FindUserService } from "@services/user/FindUserService"

export const index = async ({ user: { id } }: Request, res: Response) => {
	const {
		user: { name, email, isAdmin, createdAt },
	} = await FindUserService.execute(id)

	return res.json({ me: { name, email, isAdmin, createdAt } })
}
