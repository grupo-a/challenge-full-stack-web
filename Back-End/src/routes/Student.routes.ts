import { Router } from "express";
import CreateStudentController from "../api/modules/students/useCases/Student/Create/";
import CreateStudentMiddleware from '../api/modules/students/useCases/Student/Create/CreateStudentMiddleware'
import ReadStudentController from "../api/modules/students/useCases/Student/List";

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
  }
)

export default studentRoutes;