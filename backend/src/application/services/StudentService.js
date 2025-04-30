const { ValidationError } = require("../../utils/errors")
const Student = require("../../domain/entities/Student")

class StudentService {
  constructor(studentRepository) {
    this.studentRepository = studentRepository
  }

  async getAllStudents({ pageSize, offSet, name }) {
    return this.studentRepository.getAll({ pageSize, offSet, name })
  }

  async getStudentById(id) {
    const student = await this.studentRepository.getById(id)
    if (!student) {
      throw new ValidationError(`Estudante com ID ${id} não encontrado`)
    }
    return student
  }

  async createStudent(studentData) {
    const student = new Student(studentData)
    const validation = student.validate()

    if (!validation.isValid) {
      throw new ValidationError("Dados de estudante inválidos", validation.errors)
    }

    const existingStudent = await this.studentRepository.getByRA(student.ra)
    if (existingStudent) {
      throw new ValidationError(`Estudante com RA ${student.ra} já existe`)
    }

    return this.studentRepository.create(studentData)
  }

  async updateStudent(id, studentData) {
    await this.getStudentById(id)

    const student = new Student({ id, ...studentData })
    const validation = student.validate()

    if (!validation.isValid) {
      throw new ValidationError("Dados de estudante inválidos", validation.errors)
    }

    if (studentData.ra) {
      const existingStudent = await this.studentRepository.getByRA(studentData.ra)
      if (existingStudent && existingStudent.id !== Number.parseInt(id)) {
        throw new ValidationError(`Estudante com RA ${studentData.ra} já existe`)
      }
    }

    return this.studentRepository.update(id, studentData)
  }

  async deleteStudent(id) {
    await this.getStudentById(id)
    return this.studentRepository.delete(id)
  }
}

module.exports = StudentService
