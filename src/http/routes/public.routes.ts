import { Router } from "express"
import { login } from "../middlewares/validations"
import { loginController } from "../controllers/"

export default () => {
	const router = Router()

	router.post("/login", login, loginController.create)

	return router
}
