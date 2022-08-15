const EnrollRepository = require('../repositories/enroll-repository')
const enrollRepository = new EnrollRepository()

class EnrollService {
    async Teste() {
        enrollRepository.Teste();
    }
  }
  
  module.exports = EnrollService
  