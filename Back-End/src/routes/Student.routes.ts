import { Router } from "express";
import CreateStudentController from "../api/modules/students/useCases/Student/Create/";
import StudentMiddlewares from '../api/modules/students/useCases/Student/Middlewares/StudentMiddlewares'
import ReadStudentController from "../api/modules/students/useCases/Student/List";
import UpdateStudentController from "../api/modules/students/useCases/Student/Update/";
import DeleteStudentController from "../api/modules/students/useCases/Student/Delete/";

const studentRoutes = Router();

studentRoutes.post(
  "/",
  StudentMiddlewares.nameValidate,
  StudentMiddlewares.emailValidate,
  StudentMiddlewares.raValidate,
  StudentMiddlewares.cpfValidate,
  (req, res) => {
  return CreateStudentController().handle(req, res);
});

studentRoutes.get(
  "/",
  (req, res) => {
    return ReadStudentController().handle(req, res);
});

studentRoutes.put(
  "/:ra",
  StudentMiddlewares.nameValidate,
  StudentMiddlewares.emailValidate,
  StudentMiddlewares.raValidateParams,
  (req, res) => {
    return UpdateStudentController().handle(req, res);
})

studentRoutes.delete(
  "/:ra",
  (req, res) => {
    return DeleteStudentController().handle(req, res);
  }
)

export default studentRoutes;