// controllers/projectController.js

const Project = require('../models/Project');
const User = require('../models/User');
const {apiResponse} = require('../helpers/apiResponse');
const {createProjectValidation, updateProjectValidation} = require('../validators/projectValidator');

// Create a new project for a specific user
async function createProject(req, res) {
    try {
        const {error} = createProjectValidation.validate(req.body);
        if (error) {
            return apiResponse(res, 400, 'Validation Error', error.details[0].message, null, null);
        }

        const {title, description, status, dueDate, tags} = req.body;
        const createdBy = req.params.userId;

        const user = await User.findById(createdBy);

        if (!user) {
            return apiResponse(res, 404, 'Error', 'User not found', null, null);
        }

        const project = new Project({
            title,
            description,
            status,
            dueDate,
            tags,
            createdBy: user,
        });

        await project.save();

        return apiResponse(res, 201, 'Success', 'Project created successfully', project, null);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, 'Error', 'Internal Server Error', null, null);
    }
}

// Update a project
async function updateProject(req, res) {
    try {
        const {error} = updateProjectValidation.validate(req.body);
        if (error) {
            return apiResponse(res, 400, 'Validation Error', error.details[0].message, null, null);
        }

        const {title, description, status, dueDate, tags} = req.body;
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);

        if (!project) {
            return apiResponse(res, 404, 'Error', 'Project not found', null, null);
        }

        project.title = title;
        project.description = description;
        project.status = status;
        project.dueDate = dueDate;
        project.tags = tags;
        project.updated_at = Date.now();

        await project.save();

        return apiResponse(res, 200, 'Success', 'Project updated successfully', project, null);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, 'Error', 'Internal Server Error', null, null);
    }
}

// Delete a project
async function deleteProject(req, res) {
    try {
        const projectId = req.params.projectId;

        // Find the project by ID and delete it
        const result = await Project.deleteOne({_id: projectId});

        if (result.deletedCount === 0) {
            return apiResponse(res, 404, 'Error', 'Project not found', null, null);
        }

        // Provide a response message in the body with a 200 status code
        return apiResponse(res, 200, 'Success', 'Project deleted successfully', null, null);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, 'Error', 'Internal Server Error', null, null);
    }
}


// Get a project by ID
async function getProjectById(req, res) {
    try {
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);

        if (!project) {
            return apiResponse(res, 404, 'Error', 'Project not found', null, null);
        }

        return apiResponse(res, 200, 'Success', 'Project retrieved successfully', project, null);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, 'Error', 'Internal Server Error', null, null);
    }
}

// Get all projects for a specific user with pagination
async function getAllProjectsByUserId(req, res) {
    try {
        const userId = req.params.userId;
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        const skip = (page - 1) * perPage;

        const projects = await Project.find({'createdBy': userId})
            .skip(skip)
            .limit(perPage);

        const total = await Project.countDocuments({'createdBy': userId});

        if (!projects || projects.length === 0) {
            return apiResponse(res, 404, 'Error', 'No projects found for this user', null, null);
        }

        return apiResponse(res, 200, 'Success', 'Projects retrieved successfully', projects, null, page, perPage, total);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, 'Error', 'Internal Server Error', null, null);
    }
}

module.exports = {
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    getAllProjectsByUserId
}