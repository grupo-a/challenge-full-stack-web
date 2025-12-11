/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: "550e8400-e29b-41d4-a716-446655440000"
 *             email:
 *               type: string
 *               example: "admin@example.com"
 *             role:
 *               type: string
 *               example: "ADMIN"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate a user
 *     description: Authenticates a user and returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@example.com"
 *                 description: User's email
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "admin123"
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimpleError'
 *             example:
 *               status: "error"
 *               message: "Invalid credentials"
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               missingFields:
 *                 summary: Missing required fields
 *                 value:
 *                   status: "error"
 *                   message: "Field validation error"
 *                   errors:
 *                     - field: "email"
 *                       message: "Email is required"
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account and returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@example.com"
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: "admin123"
 *                 description: User's password (minimum 8 characters)
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: "admin123"
 *                 description: Password confirmation (must match password)
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               emailInUse:
 *                 summary: Email already in use
 *                 value:
 *                   status: "error"
 *                   message: "Field validation error"
 *                   errors:
 *                     - field: "email"
 *                       message: "Email already in use"
 *               invalidPassword:
 *                 summary: Invalid password
 *                 value:
 *                   status: "error"
 *                   message: "Field validation error"
 *                   errors:
 *                     - field: "password"
 *                       message: "Password must be at least 8 characters long"
 *               passwordMismatch:
 *                 summary: Passwords don't match
 *                 value:
 *                   status: "error"
 *                   message: "Field validation error"
 *                   errors:
 *                     - field: "confirmPassword"
 *                       message: "Passwords don't match"
 */
