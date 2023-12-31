const Joi = require('joi');

// Validation schema for updating a user's profile picture
const updateProfileValidation = Joi.object({
    profile_picture: Joi.object(),
});

// Validation schema for updating user information
const updateUserValidation = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6),
    username: Joi.string().min(3).max(30),
    hourlyRate: Joi.number().min(0),
});

module.exports = {
    updateProfileValidation,
    updateUserValidation
}
