import StudentRepository from "../domain/interfaces/StudentRepository";
import { Student } from "../domain/models/Student";
import RedisService from "../infra/redis/RedisService";

import generateRandomRANumber from "../utils";
import { LoggerService } from "./LoggerService";

export class StudentService {
  private readonly studentRepository: StudentRepository;
  private readonly loggerService: LoggerService;
  private readonly redisInMemoria: RedisService;

  constructor(
    studentRepository: StudentRepository,
    redisInMemoria: RedisService,
    loggerService: LoggerService
  ) {
    this.studentRepository = studentRepository;
    this.redisInMemoria = redisInMemoria;
    this.loggerService = loggerService;
  }

  async getAllStudents() {
    try {
      const cachedStudents = await this.redisInMemoria.getAllStudentUser();

      if (cachedStudents) {
        this.loggerService.logInfo("Students retrieved from Redis cache.");
        return cachedStudents;
      }

      const students = await this.studentRepository.getAllStudents();

      await this.redisInMemoria.saveAllStudentUser(students);

      this.loggerService.logInfo("Students retrieved from MySQL database.");
      return students;
    } catch (error) {
      this.loggerService.logError(
        `Error retrieving students: ${error.message}`
      );
      throw new Error(`Error retrieving students: ${error.message}`);
    }
  }

  async getStudentById(id: string) {
    try {
      const cachedStudent = await this.redisInMemoria.getStudentUser(id);

      if (cachedStudent) {
        this.loggerService.logInfo("Student retrieved from Redis cache.");
        return cachedStudent;
      }
      const student = await this.studentRepository.getStudentById(id);
      await this.redisInMemoria.saveStudentUser(student);

      this.loggerService.logInfo("Student retrieved from MySQL database.");
      return student;
    } catch (error) {
      this.loggerService.logError(
        `Error retrieving students: ${error.message}`
      );
      throw new Error(`Error retrieving students: ${error.message}`);
    }
  }

  async createStudent(student) {
    try {
      student.ra = generateRandomRANumber();
      const createdStudentUser = await this.studentRepository.createStudent(
        student
      );
      if (createdStudentUser.hasOwnProperty("id")) {
        await this.redisInMemoria.saveStudentUser(createdStudentUser);
      }
      return createdStudentUser;
    } catch (error) {
      this.loggerService.logError(`Error creating student: ${error.message}`);
      throw new Error(`Error creating student: ${error.message}`);
    }
  }

  async updateStudent(userId, studentUpdate: Partial<Student>) {
    try {
      const studentUpdated = await this.studentRepository.updateStudent(
        userId,
        studentUpdate
      );

      const cachedStudent = await this.redisInMemoria.getStudentUser(userId);

      if (cachedStudent) {
        const updatedStudent = { ...cachedStudent, ...studentUpdate };
        await this.redisInMemoria.saveStudentUser(updatedStudent);
      }

      await this.redisInMemoria.saveStudentUser(studentUpdated);
      this.loggerService.logInfo("Student updated successfully.");
      return studentUpdated;
    } catch (error) {
      this.loggerService.logError(`Error updating student: ${error.message}`);
      throw new Error(`Error updating student: ${error.message}`);
    }
  }

  async deleteStudent(userId: string) {
    try {
      const cachedStudent = await this.redisInMemoria.getStudentUser(userId);

      if (cachedStudent) {
        await this.redisInMemoria.deleteStudent(userId);
      }
      return await this.studentRepository.deleteStudent(userId);
    } catch (error) {
      this.loggerService.logError(`Error deleting student: ${error.message}`);
      throw new Error(`Error deleting student: ${error.message}`);
    }
  }
}
