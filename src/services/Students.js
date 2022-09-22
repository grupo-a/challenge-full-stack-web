export default class StudentsService {
  constructor(dbConnection) {
    this.dbConnection = dbConnection
  }

  async createStudent(data) {
    const repository = this.dbConnection.getRepository('Students')
    const createdStudent = await repository.save(data)
    return createdStudent
  }
  async listStudents(limit = 10, skip = 0) {
    const repository = this.dbConnection.getRepository('Students')
    const students = await repository.find({
      take: limit,
      skip
    })
    const count = await repository.count()
    return {
      skip: Number(skip),
      limit: Number(limit),
      count,
      data: students
    }
  }
  async updateStudent(id, data) {
    const repository = this.dbConnection.getRepository('Students')
    const student = await repository.findOne({
      where: {
        id
      }
    })
    if (!student) throw new Error('Student not found', 404)
    const updatedStudent = await repository.save({ ...student, ...data })
    return updatedStudent
  }
  async deleteStudent(id) {
    const repository = this.dbConnection.getRepository('Students')
    const student = await repository.findOne({
      where: {
        id
      }
    })
    if (!student) throw new Error('Student not found', 404)
    const deletedStudent = await repository.remove(student)
    return deletedStudent
  }
}
