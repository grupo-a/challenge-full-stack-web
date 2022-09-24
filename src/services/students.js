export default (dbConnection, CustomError) => {
  return {
    createStudent: async (data) => {
      const repository = dbConnection.getRepository('Students')
      const createdStudent = await repository.save(data)
      return createdStudent
    },
    listStudents: async (limit = 10, skip = 0) => {
      const repository = dbConnection.getRepository('Students')
      const students = await repository.find({
        take: limit,
        skip,
        order: {
          createdAt: 'DESC'
        }
      })
      const count = await repository.count()
      return {
        skip: Number(skip),
        limit: Number(limit),
        count,
        data: students
      }
    },
    updateStudent: async (id, data) => {
      const repository = dbConnection.getRepository('Students')
      const student = await repository.findOne({
        where: {
          id
        }
      })
      if (!student) throw new CustomError('NotFound', 'id', 'Student not found')
      student.updatedAt = new Date()
      const updatedStudent = await repository.save({ ...student, ...data })
      return updatedStudent
    },
    deleteStudent: async (id) => {
      const repository = dbConnection.getRepository('Students')
      const student = await repository.findOne({
        where: {
          id
        }
      })
      if (!student) throw new CustomError('NotFound', 'id', 'Student not found')
      const deletedStudent = await repository.remove(student)
      return deletedStudent
    }
  }
}
