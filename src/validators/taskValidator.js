const Joi = require('joi');

// Validation schema for creating a task
const createTaskValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    status: Joi.string().valid('To-Do', 'In Progress', 'Done').required(),
    dueDate: Joi.date(),
    estimatedHours: Joi.number(),
    notes: Joi.string(),
});

// Validation schema for updating a task
const updateTaskValidation = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid('To-Do', 'In Progress', 'Done'),
    dueDate: Joi.date(),
    estimatedHours: Joi.number(),
    notes: Joi.string(),
});

module.exports = {
    createTaskValidation,
    updateTaskValidation,
};
