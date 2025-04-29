const knex = require('../database/connection');
const Student = require('../models/student');

class StudentRepository {
  async getAll() {
    try {
      const students = await knex('students').select('*');
      return students.map(student => new Student(student));
    } catch (error) {
        throw new Error(`Falha ao buscar alunos:${error.message}.`);
    }
  }
}

module.exports = new StudentRepository();
