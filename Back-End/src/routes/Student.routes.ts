import { Router } from "express";
import CreateStudentController from "../api/modules/students/useCases/Student/Create/";
import CreateStudentMiddleware from '../api/modules/students/useCases/Student/Create/CreateStudentMiddleware'
import ReadStudentController from "../api/modules/students/useCases/Student/List";
import UpdateStudentController from "../api/modules/students/useCases/Student/Update/";

const studentRoutes = Router();

studentRoutes.post(
  "/",
  CreateStudentMiddleware.nameValidate,
  CreateStudentMiddleware.emailValidate,
  CreateStudentMiddleware.raValidate,
  CreateStudentMiddleware.cpfValidate,
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
  CreateStudentMiddleware.nameValidate,
  CreateStudentMiddleware.emailValidate,
  CreateStudentMiddleware.raValidateParams,
  (req, res) => {
    return UpdateStudentController().handle(req, res);
  }
)

export default studentRoutes;