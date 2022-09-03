import { Router } from "express"
import { userUpdatePassword } from "../middlewares/validations"
import { MeController, StudentController } from "../controllers"

export default () => {
	const router = Router()

	router.get("/me", MeController.get)

	router.put("/user/password", userUpdatePassword)

	router.get("/students", StudentController.find)
	router.get("/students/:id", StudentController.findOne)
	router.post("/students", StudentController.create)
	router.put("/students/:id", StudentController.update)
	router.delete("/students/:id", StudentController.delete)

	return router
}
