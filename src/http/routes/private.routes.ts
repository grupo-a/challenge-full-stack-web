import { Router } from "express"
import { userUpdatePassword } from "../middlewares/validations"
import { meController, userPasswordController } from "../controllers/"

export default () => {
	const router = Router()

	router.get("/me", meController.index)

	router.put(
		"/user/password",
		userUpdatePassword,
		userPasswordController.update,
	)

	return router
}
