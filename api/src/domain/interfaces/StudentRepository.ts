import { Student } from "../models/Student";

export default interface StudentRepository {
    getAllStudents(): Promise<Student[] | []>;
    getStudentById(userId: string): Promise<Student | object>;
    createStudent(student: Student): Promise<Student | object>;
    updateStudent(userId: string, student: Partial<Student>): Promise<object>;
    deleteStudent(userId: string): Promise<object>;
}