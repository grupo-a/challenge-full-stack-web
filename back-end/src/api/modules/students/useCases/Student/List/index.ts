import StudentRepository from "../../../repositories/implementations/StudentRepository";
import ReadStudentController from "./ReadStudentController";
import ReadStudentUseCase from "./ReadStudentUseCase";

export default (): ReadStudentController => {
  const studentRepository = new StudentRepository();
  const readStudentUseCase = new ReadStudentUseCase(studentRepository);
  const readStudentController = new ReadStudentController(readStudentUseCase);

  return readStudentController
}