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
import { authorizationMiddleware } from "../middlewares"

export default () => {
	const router = Router()

	router.get("/me", MeController.get)

	router.put(
		"/user/password",
		userUpdatePassword,
		UserPasswordController.update,
	)

	const student = Router()
	student.get("/", StudentController.find)
	student.get("/:id", StudentController.findOne)
	student.post("/", createStudent, StudentController.create)
	student.put("/:id", updateStudent, StudentController.update)
	student.delete("/:id", StudentController.delete)

	router.use("/students", authorizationMiddleware(true), student)
	return router
}
