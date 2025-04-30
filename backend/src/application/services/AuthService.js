const bcrypt = require("bcrypt")
const { UnauthorizedError } = require("../../utils/errors")
const generateToken = require("../../utils/generateToken")

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async authenticate(email, password) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedError("Credenciais inválidas")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedError("Credenciais inválidas")
    }

    const token = await generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    })

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    }
  }
}

module.exports = AuthService
