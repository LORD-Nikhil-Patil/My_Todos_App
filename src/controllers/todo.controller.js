const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { todoService } = require('../services');

const createTodo = catchAsync(async (req, res) => {
  const todo = await todoService.createTodo(req.body);
  res.status(httpStatus.CREATED).send(todo);
});

const getTodos = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'status', 'user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await todoService.queryTodos(filter, options);
  res.send(result);
});

const getTodo = catchAsync(async (req, res) => {
  const todo = await todoService.getTodoById(req.params.todoId);
  if (!todo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Todo not found');
  }
  res.send(todo);
});

const updateTodo = catchAsync(async (req, res) => {
  const todo = await todoService.updateTodoById(req.params.todoId, req.body);
  res.send(todo);
});

const deleteTodo = catchAsync(async (req, res) => {
  await todoService.deleteTodoById(req.params.todoId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
