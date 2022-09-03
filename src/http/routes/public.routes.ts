import { Router } from "express"
import { login } from "../middlewares/validations"
import { LoginController } from "../controllers/"

export default () => {
	const router = Router()

	router.post("/login", login, LoginController.create)

	return router
}
