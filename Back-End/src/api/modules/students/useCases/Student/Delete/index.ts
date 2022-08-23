import StudentRepository from "../../../repositories/implementations/StudentRepository";
import DeleteStudentController from "./DeleteStudentController";
import DeleteStudentUseCase from "./DeleteStudentUseCase";

export default (): DeleteStudentController => {
  const studentRepository = new StudentRepository();
  const deleteStudentUseCase = new DeleteStudentUseCase(studentRepository);
  const deleteStudentController = new DeleteStudentController(deleteStudentUseCase);

  return deleteStudentController
}