/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Student unique identifier
 *         name:
 *           type: string
 *           minLength: 3
 *           description: Student full name
 *         email:
 *           type: string
 *           format: email
 *           description: Student email address
 *         cpf:
 *           type: string
 *           minLength: 11
 *           maxLength: 11
 *           description: Student CPF (only numbers)
 *         ra:
 *           type: integer
 *           description: Student registration number (auto-generated)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       required:
 *         - id
 *         - name
 *         - email
 *         - cpf
 *         - ra
 *
 *     CreateStudentRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           description: Student full name
 *         email:
 *           type: string
 *           format: email
 *           description: Student email address
 *         cpf:
 *           type: string
 *           minLength: 11
 *           description: Student CPF (can include formatting characters)
 *       required:
 *         - name
 *         - email
 *         - cpf
 *       example:
 *         name: João Silva
 *         email: joao.silva@example.com
 *         cpf: "12345678909"
 *
 *     UpdateStudentRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           description: Student full name
 *         email:
 *           type: string
 *           format: email
 *           description: Student email address
 *       example:
 *         name: João Santos
 *         email: joao.santos@example.com
 *
 *     PaginatedStudentsResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Student'
 *         meta:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               description: Total number of students
 *             page:
 *               type: integer
 *               description: Current page number
 *             limit:
 *               type: integer
 *               description: Number of items per page
 *             totalPages:
 *               type: integer
 *               description: Total number of pages
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     description: Creates a new student with the provided information. Email and CPF must be unique.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStudentRequest'
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request - Invalid data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       422:
 *         description: Unprocessable Entity - Validation errors (email or CPF already exists)
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: List all students
 *     description: Returns a paginated list of students with optional filters by name, email, or RA
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter students by name (partial match, case insensitive)
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter students by email (partial match, case insensitive)
 *       - in: query
 *         name: ra
 *         schema:
 *           type: integer
 *         description: Filter students by RA (exact match)
 *     responses:
 *       200:
 *         description: List of students retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedStudentsResponse'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get student by ID
 *     description: Returns a single student by their unique identifier
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student unique identifier
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Student not found
 */

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update student
 *     description: Updates student information. Only name and email can be updated. CPF and RA are not editable.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student unique identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStudentRequest'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request - Invalid data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Student not found
 *       422:
 *         description: Unprocessable Entity - Validation errors (email already exists)
 */

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete student
 *     description: Permanently deletes a student from the system
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student unique identifier
 *     responses:
 *       204:
 *         description: Student deleted successfully
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Student not found
 */
