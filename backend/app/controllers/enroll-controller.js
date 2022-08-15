const EnrollService = require('../services/enroll-service')
const enrollService= new EnrollService()

class EnrollController {
  async Teste(req, res) {
    try {
        enrollService.Teste();
        res.json({
            teste: 'ok'
        });
    } catch (err) {
      // Error response
      let code = err.code ? err.code : 500;
      return res.status(code).json({
        statusCode: res.statusCode,
        error: err.message
      });
    }
  }
}

module.exports = EnrollController
