import { Router } from "express";
import CreateStudentController from "../api/modules/students/useCases/Student/Create/";

const studentRoutes = Router();

studentRoutes.post("/", (req, res) => {
  return CreateStudentController().handle(req, res);
})

export default studentRoutes;