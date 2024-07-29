const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const todoValidation = require('../../validations/todo.validation');
const todoController = require('../../controllers/todo.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageTodos'), validate(todoValidation.createTodo), todoController.createTodo)
  .get(auth('getTodos'), validate(todoValidation.getTodos), todoController.getTodos);

router
  .route('/:todoId')
  .get(auth('getTodos'), validate(todoValidation.getTodo), todoController.getTodo)
  .patch(auth('manageTodos'), validate(todoValidation.updateTodo), todoController.updateTodo)
  .delete(auth('manageTodos'), validate(todoValidation.deleteTodo), todoController.deleteTodo);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management and retrieval
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a todo
 *     description: Only authorized users can create todos.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - user
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *               user:
 *                 type: string
 *                 description: User ID
 *             example:
 *               title: Buy groceries
 *               description: Purchase milk, eggs, and bread
 *               status: pending
 *               user: 60d0fe4f5311236168a109ca
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Todo'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all todos
 *     description: Only authorized users can retrieve todos.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Todo title
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Todo status
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by query in the form of field:desc/asc (ex. title:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of todos
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /todos/{todoId}:
 *   get:
 *     summary: Get a todo
 *     description: Only authorized users can fetch todos by ID.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Todo'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a todo
 *     description: Only authorized users can update todos.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *             example:
 *               title: Update groceries list
 *               description: Add fruits and vegetables
 *               status: in-progress
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Todo'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a todo
 *     description: Only authorized users can delete todos.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
