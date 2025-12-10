/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         username:
 *           type: string
 *           example: "admin"
 *         role:
 *           type: string
 *           enum: [ADMIN, COLLABORATOR]
 *           example: "ADMIN"
 *         collaboratorId:
 *           type: number
 *           nullable: true
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T08:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T08:00:00.000Z"
 *     PaginatedUserResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         meta:
 *           type: object
 *           properties:
 *             total:
 *               type: number
 *               example: 25
 *               description: Total number of users matching the query
 *             page:
 *               type: number
 *               example: 1
 *               description: Current page number
 *             limit:
 *               type: number
 *               example: 10
 *               description: Number of records per page
 *             totalPages:
 *               type: number
 *               example: 3
 *               description: Total number of pages
 *     ValidationError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "error"
 *         message:
 *           type: string
 *           example: "Field validation error"
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "password"
 *               message:
 *                 type: string
 *                 example: "Password must be at least 8 characters long"
 *     SimpleError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "error"
 *         message:
 *           type: string
 *           example: "Resource not found"
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: |
 *       Creates a new user. Requires admin privileges.
 *
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - password
 *               - confirmPassword
 *               - role
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "João Silva"
 *                 description: Full name to generate username
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "admin123"
 *                 description: Password (min 8 characters)
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: "admin123"
 *                 description: Must match password
 *               role:
 *                 type: string
 *                 enum: [ADMIN, COLLABORATOR]
 *                 example: "COLLABORATOR"
 *               collaboratorId:
 *                 type: number
 *                 example: 1
 *                 description: Optional ID of the associated collaborator
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - Username already exists or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimpleError'
 *             examples:
 *               usernameExists:
 *                 summary: Username already exists
 *                 value:
 *                   status: "error"
 *                   message: "Username already exists"
 *       401:
 *         description: Unauthorized - Invalid token or not admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimpleError'
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               invalidPassword:
 *                 summary: Invalid password
 *                 value:
 *                   status: "error"
 *                   message: "Field validation error"
 *                   errors:
 *                     - field: "password"
 *                       message: "Password must be at least 8 characters long"
 *               passwordsMismatch:
 *                 summary: Passwords do not match
 *                 value:
 *                   status: "error"
 *                   message: "Field validation error"
 *                   errors:
 *                     - field: "confirmPassword"
 *                       message: "Passwords don't match"
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users with pagination
 *     description: |
 *       Returns a paginated list of all users. Requires admin privileges.
 *       Supports pagination through query parameters.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number (starts at 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page (max 100)
 *         example: 10
 *     responses:
 *       200:
 *         description: Paginated list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedUserResponse'
 *             example:
 *               data:
 *                 - id: 1
 *                   username: "admin"
 *                   role: "ADMIN"
 *                   collaboratorId: null
 *                   createdAt: "2024-01-15T08:00:00.000Z"
 *                   updatedAt: "2024-01-15T08:00:00.000Z"
 *                 - id: 2
 *                   username: "joao_silva"
 *                   role: "COLLABORATOR"
 *                   collaboratorId: 1
 *                   createdAt: "2024-01-16T09:00:00.000Z"
 *                   updatedAt: "2024-01-16T09:00:00.000Z"
 *               meta:
 *                 total: 25
 *                 page: 1
 *                 limit: 10
 *                 totalPages: 3
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimpleError'
 *       422:
 *         description: Validation error - Invalid pagination parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               invalidPage:
 *                 summary: Invalid page number
 *                 value:
 *                   status: "error"
 *                   message: "Field validation error"
 *                   errors:
 *                     - field: "page"
 *                       message: "Number must be greater than 0"
 *               invalidLimit:
 *                 summary: Limit exceeds maximum
 *                 value:
 *                   status: "error"
 *                   message: "Field validation error"
 *                   errors:
 *                     - field: "limit"
 *                       message: "Number must be less than or equal to 100"
 */

/**
 * @swagger
 * /users/check-username/{username}:
 *   get:
 *     summary: Check if username exists
 *     description: Checks if a username is already registered. Requires admin privileges.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username to check
 *         example: "existing_user"
 *     responses:
 *       200:
 *         description: Username check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimpleError'
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Returns a single user by ID. Requires admin privileges.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: User ID
 *         example: 1
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimpleError'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimpleError'
 *             example:
 *               status: "error"
 *               message: "User not found"
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: |
 *       Updates an existing user. Requires admin privileges.
 *       Only password and role can be updated.
 *
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: User ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Newadmin123"
 *                 description: New password (min 8 characters)
 *               role:
 *                 type: string
 *                 enum: [ADMIN, COLLABORATOR]
 *                 example: "ADMIN"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimpleError'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimpleError'
 *             example:
 *               status: "error"
 *               message: "User not found"
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               invalidPassword:
 *                 summary: Invalid password
 *                 value:
 *                   status: "error"
 *                   message: "Field validation error"
 *                   errors:
 *                     - field: "password"
 *                       message: "Password must be at least 8 characters long"
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by ID. Requires admin privileges.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: User ID
 *         example: 1
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimpleError'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimpleError'
 *             example:
 *               status: "error"
 *               message: "User not found"
 */
