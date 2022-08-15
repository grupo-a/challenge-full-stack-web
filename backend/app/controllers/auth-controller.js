
class AuthController {
  async validateToken(request, response, next) {
    // try {

    //   const { token } = request.headers;

    //   const result = await axios.get(`${process.env.API_URL}/auth/user/${token}`);
    //   request.authenticated = {
    //     ...result.data,
    //     token
    //   }
    //   next();

    // } catch (err) {

    //   if (err && err.response && err.response.status && err.response.status === 401) {
    //     err.code = 401
    //     err.message = 'USUÁRIO NÃO AUTORIZADO!'
    //   }

    //   if (typeof err.code === 'string') {
    //     err.code = null
    //   }

    //   // Error response
    //   let code = err.code ? err.code : 500;
    //   return response.status(code).json({
    //     statusCode: response.statusCode,
    //     error: err.message
    //   });
    // }
  }
}

module.exports = AuthController;