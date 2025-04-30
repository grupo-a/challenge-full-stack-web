const { ValidationError } = require("../../utils/errors")

const validateStudent = (req, res, next) => {
  const { name, email, ra, cpf } = req.body
  const errors = []

  if (!name || name.trim() === "") {
    errors.push("Nome é obrigatório")
  }

  if (!email) {
    errors.push("Email é obrigatório")
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errors.push("Email inválido")
    }
  }

  if (!ra || ra.trim() === "") {
    errors.push("RA é obrigatório")
  }

  if (!cpf) {
    errors.push("CPF é obrigatório")
  } else if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
    errors.push("CPF inválido")
  }

  if (errors.length > 0) {
    throw new ValidationError("Dados de estudante inválidos", errors)
  }

  next()
}

module.exports = {
  validateStudent,
}
