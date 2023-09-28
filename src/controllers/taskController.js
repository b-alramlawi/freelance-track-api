// controllers/taskController.js

const Task = require('../models/Task');
const Project = require('../models/Project');
const {apiResponse} = require('../helpers/apiResponse');
const {createTaskValidation, updateTaskValidation} = require('../validators/taskValidator'); // Import the validator
const excelHelper = require('../helpers/excelExport'); // Import the helper


// Create a new task for a project
async function createTask(req, res) {
    try {
        const {error} = createTaskValidation.validate(req.body); // Validate the request data
        if (error) {
            return apiResponse(res, 400, 'Validation Error', error.details[0].message, null, null);
        }

        const {title, description, status, dueDate, estimatedHours, notes} = req.body;
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);

        if (!project) {
            return apiResponse(res, 404, 'Error', 'Project not found', null, null);
        }

        const task = new Task({
            title,
            description,
            status,
            dueDate,
            estimatedHours,
            notes,
            project,
        });

        await task.save();

        return apiResponse(res, 201, 'Success', 'Task created successfully', task, null);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, 'Error', 'Internal Server Error', null, null);
    }
}

// Update a task
async function updateTask(req, res) {
    try {
        const {error} = updateTaskValidation.validate(req.body); // Validate the request data
        if (error) {
            return apiResponse(res, 400, 'Validation Error', error.details[0].message, null, null);
        }

        const {title, description, status, dueDate, estimatedHours, notes} = req.body;
        const taskId = req.params.taskId;

        const task = await Task.findById(taskId);

        if (!task) {
            return apiResponse(res, 404, 'Error', 'Task not found', null, null);
        }

        task.title = title;
        task.description = description;
        task.status = status;
        task.dueDate = dueDate;
        task.estimatedHours = estimatedHours;
        task.notes = notes;
        task.updated_at = Date.now();

        await task.save();

        return apiResponse(res, 200, 'Success', 'Task updated successfully', task, null);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, 'Error', 'Internal Server Error', null, null);
    }
}

// Delete a task
async function deleteTask(req, res) {
    try {
        const taskId = req.params.taskId;

        // Find the task by ID and delete it
        const result = await Task.deleteOne({_id: taskId});

        if (result.deletedCount === 0) {
            return apiResponse(res, 404, 'Error', 'Task not found', null, null);
        }

        // Provide a response message in the body with a 200 status code
        return apiResponse(res, 200, 'Success', 'Task deleted successfully', null, null);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, 'Error', 'Internal Server Error', null, null);
    }
}


// Get a task by ID
async function getTaskById(req, res) {
    try {
        const taskId = req.params.taskId;

        const task = await Task.findById(taskId);

        if (!task) {
            return apiResponse(res, 404, 'Error', 'Task not found', null, null);
        }

        return apiResponse(res, 200, 'Success', 'Task retrieved successfully', task, null);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, 'Error', 'Internal Server Error', null, null);
    }
}

// Get all tasks for a specific project with pagination
async function getAllTasksByProjectId(req, res) {
    try {
        const projectId = req.params.projectId;
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        const skip = (page - 1) * perPage;

        const tasks = await Task.find({'project': projectId})
            .skip(skip)
            .limit(perPage);

        const total = await Task.countDocuments({'project': projectId});

        if (!tasks || tasks.length === 0) {
            return apiResponse(res, 404, 'Error', 'No tasks found for this project', null, null);
        }

        return apiResponse(res, 200, 'Success', 'Tasks retrieved successfully', tasks, null, page, perPage, total);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, 'Error', 'Internal Server Error', null, null);
    }
}


// Export tasks to Excel
async function exportTasksToExcel(req, res) {
    try {
        const projectId = req.params.projectId;

        // Retrieve tasks for the specified project
        const tasks = await Task.find({project: projectId});

        if (!tasks || tasks.length === 0) {
            return apiResponse(res, 404, 'Error', 'No tasks found for this project', null, null);
        }

        // Call the exportTasksToExcel function from the helper
        await excelHelper.exportTasksToExcel(tasks, res);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, 'Error', 'Internal Server Error', null, null);
    }
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    getAllTasksByProjectId,
    exportTasksToExcel
}