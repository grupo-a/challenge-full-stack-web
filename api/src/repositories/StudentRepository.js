var db = require('../models');

var StudentRepository = {
  findAll: async function() {
    const students = await db.Student.findAll();
    return students;
  },
  findById: async function(id) {
    const student = await db.Student.findByPk(id);
    return student;
  },
  findByRa: async function(ra) {
    const student = await db.Student.findOne({
      where: {
        ra: ra
      }
    });

    return student;
  },
  findByCpf: async function(cpf) {
    const student = await db.Student.findOne({
      where: {
        cpf: cpf
      }
    });

    return student;
  },
  findByEmail: async function(email) {
    const student = await db.Student.findOne({
      where: {
        email: email
      }
    });

    return student;
  },
  createStudent: async function(studentData) {
    const student = await db.Student.create(studentData);
    return student;
  },
  update: async function(studentData) {
    const { id } = studentData;

    await db.Student.update(studentData, {
      where: {
        id: id
      }
    });

    const student = await this.findById(id);

    return student;
  },
  delete: async function(id){
    await db.Student.destroy({
      where: {
        id: id
      }
    });
  }
}

module.exports = StudentRepository