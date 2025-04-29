class Student {
    constructor({ id, name, email, ra, cpf, created_at, updated_at }) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.ra = ra;
      this.cpf = cpf;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = Student;
  