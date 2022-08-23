import { Router } from "express";
import CreateStudentController from "../api/modules/students/useCases/Student/Create/";
import CreateStudentMiddleware from '../api/modules/students/useCases/Student/Create/CreateStudentMiddleware'

const studentRoutes = Router();

studentRoutes.post(
  "/",
  CreateStudentMiddleware.nameValidate,
  CreateStudentMiddleware.emailValidate,
  CreateStudentMiddleware.raValidate,
  CreateStudentMiddleware.cpfValidate,
  (req, res) => {
  return CreateStudentController().handle(req, res);
})

export default studentRoutes;