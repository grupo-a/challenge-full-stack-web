const jwt = require("jsonwebtoken")
require("dotenv").config()

async function generateToken(payload, secret = process.env.JWT_SECRET, options = { expiresIn: process.env.JWT_TIME }) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

async function generateTestToken() {
  try {
    const token = await generateToken({ id: 1, name: "Dev Tester" }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIME,
    })
    console.log("Token de teste gerado:", token)
    return token
  } catch (error) {
    console.error("Erro ao gerar token:", error)
    throw error
  }
}

if (require.main === module) {
  generateTestToken()
}

module.exports = generateToken
