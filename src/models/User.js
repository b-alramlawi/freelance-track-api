// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    username: String,
    hourlyRate: Number,
    isVerified: Boolean,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    profile_picture: String,
});

module.exports = mongoose.model('User', userSchema);
