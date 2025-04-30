class IStudentRepository {

  async getAll({ pageSize, offSet, name }) {
    throw new Error("Method not implemented")
  }

  async getById(id) {
    throw new Error("Method not implemented")
  }

  async getByRA(ra) {
    throw new Error("Method not implemented")
  }

  async create(studentData) {
    throw new Error("Method not implemented")
  }

  async update(id, studentData) {
    throw new Error("Method not implemented")
  }

  async delete(id) {
    throw new Error("Method not implemented")
  }
}

module.exports = IStudentRepository
