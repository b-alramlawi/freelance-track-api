// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    status: {type: String, enum: ['To-Do', 'In Progress', 'Done'], default: 'To-Do'},
    dueDate: {type: Date},
    estimatedHours: {type: Number},
    notes: {type: String},
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Task', taskSchema);
