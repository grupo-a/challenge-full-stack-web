class Student {
  constructor({ id, name, email, ra, cpf, created_at, updated_at }) {
    this.id = id
    this.name = name
    this.email = email
    this.ra = ra
    this.cpf = cpf
    this.created_at = created_at
    this.updated_at = updated_at
  }

  validate() {
    const errors = []

    if (!this.name || this.name.trim() === "") {
      errors.push("Nome é obrigatório")
    }

    if (!this.email || !this.validateEmail(this.email)) {
      errors.push("Email inválido")
    }

    if (!this.ra || this.ra.trim() === "") {
      errors.push("RA é obrigatório")
    }

    if (!this.cpf || !this.validateCPF(this.cpf)) {
      errors.push("CPF inválido")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  validateCPF(cpf) {
    return cpf && cpf.length === 11 && /^\d+$/.test(cpf)
  }
}

module.exports = Student
