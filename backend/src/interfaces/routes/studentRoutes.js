const express = require("express")
const router = express.Router()
const StudentController = require("../controllers/StudentController")
const StudentService = require("../../application/services/StudentService")
const StudentRepository = require("../../infrastructure/repositories/StudentRepository")
const authMiddleware = require("../middlewares/authMiddleware")
const { validateStudent } = require("../middlewares/validationMiddleware")

const studentRepository = new StudentRepository()
const studentService = new StudentService(studentRepository)
const studentController = new StudentController(studentService)

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retorna todos os estudantes
 *     description: Retorna uma lista paginada de estudantes com opção de filtro por nome
 *     parameters:
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de itens por página
 *       - in: query
 *         name: offSet
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Offset para paginação
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtro por nome (parcial)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estudantes
 *       401:
 *         description: Não autorizado
 */
router.get("/students", authMiddleware, (req, res, next) => studentController.getAll(req, res, next))

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Retorna um estudante pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estudante
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estudante encontrado
 *       404:
 *         description: Estudante não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get("/students/:id", authMiddleware, (req, res, next) => studentController.getById(req, res, next))

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Cria um novo estudante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - ra
 *               - cpf
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               ra:
 *                 type: string
 *               cpf:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Estudante criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post("/students", [authMiddleware, validateStudent], (req, res, next) =>
  studentController.create(req, res, next),
)

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Atualiza um estudante existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estudante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               ra:
 *                 type: string
 *               cpf:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estudante atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Estudante não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put("/students/:id", [authMiddleware, validateStudent], (req, res, next) =>
  studentController.update(req, res, next),
)

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Remove um estudante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estudante
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Estudante removido com sucesso
 *       404:
 *         description: Estudante não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete("/students/:id", authMiddleware, (req, res, next) => studentController.delete(req, res, next))

module.exports = router
