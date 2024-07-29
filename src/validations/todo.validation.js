const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTodo = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending'),
    user: Joi.string().required().custom(objectId),
  }),
};

const getTodos = {
  query: Joi.object().keys({
    title: Joi.string(),
    status: Joi.string().valid('pending', 'in-progress', 'completed'),
    user: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTodo = {
  params: Joi.object().keys({
    todoId: Joi.string().custom(objectId),
  }),
};

const updateTodo = {
  params: Joi.object().keys({
    todoId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      status: Joi.string().valid('pending', 'in-progress', 'completed'),
    })
    .min(1),
};

const deleteTodo = {
  params: Joi.object().keys({
    todoId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
