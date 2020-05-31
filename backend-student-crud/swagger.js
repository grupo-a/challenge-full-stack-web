/**
 * @swagger
 * definitions:
 *   Student:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       cpf:
 *         type: string
 */

/**
 * @swagger
 * 
 * /students:
 *  get:
 *      tags:
 *          - Students
 *      description: Buscar todos os estudantes.
 *      produces: 
 *          - application/json
 *      responses:
 *          200:
 *              description: Sucesso!
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/Student'
 */