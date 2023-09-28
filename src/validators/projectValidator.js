const Joi = require('joi');

// Validation schema for creating a project
const createProjectValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('In Progress', 'Completed', 'Canceled').required(),
    dueDate: Joi.date(),
    tags: Joi.array().items(Joi.string()),
});

// Validation schema for updating a project
const updateProjectValidation = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid('In Progress', 'Completed', 'Canceled'),
    dueDate: Joi.date(),
    tags: Joi.array().items(Joi.string()),
});

module.exports = {
    createProjectValidation,
    updateProjectValidation,
};

