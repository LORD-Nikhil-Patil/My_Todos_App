const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins'); 

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

todoSchema.plugin(toJSON);
todoSchema.plugin(paginate);

/**
 * Check if title is taken
 * @param {string} title - The todo title
 * @param {ObjectId} [excludeTodoId] - The id of the todo to be excluded
 * @returns {Promise<boolean>}
 */
todoSchema.statics.isTitleTaken = async function (title, excludeTodoId) {
  const todo = await this.findOne({ title, _id: { $ne: excludeTodoId } });
  return !!todo;
};

/**
 * @typedef Todo
 */
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
