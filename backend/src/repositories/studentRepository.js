const knex = require('../database/connection');

class StudentRepository {
  async getAll({ pageSize, offSet, name }) {
    const query = knex('students').select('*');

    if (name) {
      query.whereILike('name', `%${name}%`);
    }

    query.limit(pageSize).offset(offSet);

    return query;
  }
}

module.exports = new StudentRepository();
