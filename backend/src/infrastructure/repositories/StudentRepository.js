const knex = require("../../database/connection")
const IStudentRepository = require("../../domain/repositories/IStudentRepository")
const Student = require("../../domain/entities/Student")
const { NotFoundError } = require("../../utils/errors")

class StudentRepository extends IStudentRepository {
  async getAll({ pageSize, offSet, name }) {
    const query = knex("students").select("*")

    if (name) {
      query.whereILike("name", `%${name}%`)
    }

    const results = await query.limit(pageSize).offset(offSet)
    return results.map((student) => new Student(student))
  }

  async getById(id) {
    const student = await knex("students").where({ id }).first()

    if (!student) {
      return null
    }

    return new Student(student)
  }

  async getByRA(ra) {
    const student = await knex("students").where({ ra }).first()

    if (!student) {
      return null
    }

    return new Student(student)
  }

  async create(studentData) {
    const [id] = await knex("students").insert(studentData).returning("id")
    return this.getById(id)
  }

  async update(id, studentData) {
    const student = await this.getById(id)

    if (!student) {
      throw new NotFoundError(`Estudante com ID ${id} não encontrado`)
    }

    await knex("students")
      .where({ id })
      .update({
        ...studentData,
        updated_at: knex.fn.now(),
      })

    return this.getById(id)
  }

  async delete(id) {
    const student = await this.getById(id)

    if (!student) {
      throw new NotFoundError(`Estudante com ID ${id} não encontrado`)
    }

    await knex("students").where({ id }).delete()
    return true
  }
}

module.exports = StudentRepository
