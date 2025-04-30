const request = require("supertest")
const jwt = require("jsonwebtoken")
const app = require("../app")
const knex = require("../database/connection")

const generateTestToken = () => {
  return jwt.sign({ id: 1, name: "Test User" }, process.env.JWT_SECRET, { expiresIn: "1h" })
}

beforeAll(async () => {
  await knex.migrate.rollback()
  await knex.migrate.latest()
  await knex.seed.run()
})

afterAll(async () => {
  await knex.destroy()
})

describe("Estudantes API", () => {
  describe("GET /api/v1/students", () => {
    it("deve retornar todos os estudantes", async () => {
      const token = generateTestToken()
      const response = await request(app).get("/api/v1/students").set("Authorization", `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBeGreaterThan(0)
    })

    it("deve retornar 401 se o token estiver ausente", async () => {
      const response = await request(app).get("/api/v1/students")
      expect(response.status).toBe(401)
      expect(response.body.message).toBe("Token não fornecido")
    })

    it("deve filtrar estudantes por nome", async () => {
      const token = generateTestToken()
      const response = await request(app).get("/api/v1/students?name=Rafael").set("Authorization", `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body[0].name).toContain("Rafael")
    })
  })

  describe("GET /api/v1/students/:id", () => {
    it("deve retornar um estudante pelo ID", async () => {
      const token = generateTestToken()

      const allStudents = await request(app).get("/api/v1/students").set("Authorization", `Bearer ${token}`)

      const studentId = allStudents.body[0].id

      const response = await request(app).get(`/api/v1/students/${studentId}`).set("Authorization", `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body.id).toBe(studentId)
    })

    it("deve retornar 404 para ID inexistente", async () => {
      const token = generateTestToken()
      const response = await request(app).get("/api/v1/students/9999").set("Authorization", `Bearer ${token}`)

      expect(response.status).toBe(404)
    })
  })

  describe("POST /api/v1/students", () => {
    it("deve criar um novo estudante", async () => {
      const token = generateTestToken()
      const newStudent = {
        name: "Novo Estudante",
        email: "novo@example.com",
        ra: "123456",
        cpf: "12345678901",
      }

      const response = await request(app)
        .post("/api/v1/students")
        .set("Authorization", `Bearer ${token}`)
        .send(newStudent)

      expect(response.status).toBe(201)
      expect(response.body.name).toBe(newStudent.name)
      expect(response.body.email).toBe(newStudent.email)
      expect(response.body.ra).toBe(newStudent.ra)
    })

    it("deve retornar erro para dados inválidos", async () => {
      const token = generateTestToken()
      const invalidStudent = {
        name: "",
        email: "invalid-email",
        ra: "",
        cpf: "123",
      }

      const response = await request(app)
        .post("/api/v1/students")
        .set("Authorization", `Bearer ${token}`)
        .send(invalidStudent)

      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()
      expect(response.body.errors.length).toBeGreaterThan(0)
    })
  })

  describe("PUT /api/v1/students/:id", () => {
    it("deve atualizar um estudante existente", async () => {
      const token = generateTestToken()

      const allStudents = await request(app).get("/api/v1/students").set("Authorization", `Bearer ${token}`)

      const studentId = allStudents.body[0].id

      const updatedData = {
        name: "Nome Atualizado",
        email: "atualizado@example.com",
      }

      const response = await request(app)
        .put(`/api/v1/students/${studentId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedData)

      expect(response.status).toBe(200)
      expect(response.body.id).toBe(studentId)
      expect(response.body.name).toBe(updatedData.name)
      expect(response.body.email).toBe(updatedData.email)
    })
  })

  describe("DELETE /api/v1/students/:id", () => {
    it("deve excluir um estudante", async () => {
      const token = generateTestToken()

      const newStudent = {
        name: "Estudante para Excluir",
        email: "excluir@example.com",
        ra: "654321",
        cpf: "10987654321",
      }

      const createdStudent = await request(app)
        .post("/api/v1/students")
        .set("Authorization", `Bearer ${token}`)
        .send(newStudent)

      const studentId = createdStudent.body.id

      const response = await request(app)
        .delete(`/api/v1/students/${studentId}`)
        .set("Authorization", `Bearer ${token}`)

      expect(response.status).toBe(204)

      const getResponse = await request(app)
        .get(`/api/v1/students/${studentId}`)
        .set("Authorization", `Bearer ${token}`)

      expect(getResponse.status).toBe(404)
    })
  })
})
