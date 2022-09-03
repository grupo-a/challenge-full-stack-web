import { Router } from "express"
import {
	createStudent,
	userUpdatePassword,
	updateStudent,
} from "../middlewares/validations"
import {
	MeController,
	StudentController,
	UserPasswordController,
} from "../controllers"

export default () => {
	const router = Router()

	router.get("/me", MeController.get)

	router.put(
		"/user/password",
		userUpdatePassword,
		UserPasswordController.update,
	)

	router.get("/students", StudentController.find)
	router.get("/students/:id", StudentController.findOne)
	router.post("/students", createStudent, StudentController.create)
	router.put("/students/:id", updateStudent, StudentController.update)
	router.delete("/students/:id", StudentController.delete)

	return router
}
