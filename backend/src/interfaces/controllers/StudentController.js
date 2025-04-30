const { ValidationError } = require("../../utils/errors")

class StudentController {
  constructor(studentService) {
    this.studentService = studentService
  }

  async getAll(req, res, next) {
    try {
      const { pageSize = 10, offSet = 0, name } = req.query
      const students = await this.studentService.getAllStudents({
        pageSize: Number.parseInt(pageSize),
        offSet: Number.parseInt(offSet),
        name,
      })
      res.status(200).json(students)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params
      const student = await this.studentService.getStudentById(id)
      res.status(200).json(student)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const student = await this.studentService.createStudent(req.body)
      res.status(201).json(student)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      const student = await this.studentService.updateStudent(id, req.body)
      res.status(200).json(student)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      await this.studentService.deleteStudent(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = StudentController
