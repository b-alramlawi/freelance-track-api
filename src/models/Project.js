// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, enum: ['In Progress', 'Completed', 'Canceled'], required: true},
    dueDate: {type: Date},
    tags: [{type: String}],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Project', projectSchema);
