import { Router } from "express";
import { StudentController } from "../controllers/student.controller";
import { CreateStudentUseCase } from "@/modules/student/application/usecases/create-student.usecase";
import { ListStudentsUseCase } from "@/modules/student/application/usecases/list-students.usecase";
import { GetStudentByIdUseCase } from "@/modules/student/application/usecases/get-student-by-id.usecase";
import { UpdateStudentUseCase } from "@/modules/student/application/usecases/update-student.usecase";
import { DeleteStudentUseCase } from "@/modules/student/application/usecases/delete-student.usecase";
import { DrizzleStudentRepository } from "@/modules/student/infrastructure/database/drizzle/drizzle-student.repository";
import { authMiddleware } from "@/common/infrastructure/http/middlewares/auth.middleware";
import { adminMiddleware } from "@/common/infrastructure/http/middlewares/admin.middleware";

const studentRoutes = Router();

const studentRepository = new DrizzleStudentRepository();

const createStudentUseCase = new CreateStudentUseCase(studentRepository);
const listStudentsUseCase = new ListStudentsUseCase(studentRepository);
const getStudentByIdUseCase = new GetStudentByIdUseCase(studentRepository);
const updateStudentUseCase = new UpdateStudentUseCase(studentRepository);
const deleteStudentUseCase = new DeleteStudentUseCase(studentRepository);

const studentController = new StudentController(
  createStudentUseCase,
  listStudentsUseCase,
  getStudentByIdUseCase,
  updateStudentUseCase,
  deleteStudentUseCase
);

studentRoutes.use(authMiddleware);
studentRoutes.use(adminMiddleware);

studentRoutes.post("/", (req, res) => studentController.create(req, res));
studentRoutes.get("/", (req, res) => studentController.list(req, res));
studentRoutes.get("/:id", (req, res) => studentController.getById(req, res));
studentRoutes.put("/:id", (req, res) => studentController.update(req, res));
studentRoutes.delete("/:id", (req, res) => studentController.delete(req, res));

export { studentRoutes };
