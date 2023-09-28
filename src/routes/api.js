// routes/api.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');


// user authentication control routes
router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);
router.get('/verify/:token', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.post('/logout', authMiddleware.isAuthenticated, authController.logoutUser);

// user profile control routes
router.get('/profile/:userId', authMiddleware.isAuthenticated, profileController.getUserById);
router.put('/update-profile/:userId', authMiddleware.isAuthenticated, profileController.updateUser);
router.put('/update-profile-image/:userId', authMiddleware.isAuthenticated, profileController.updateProfile);


// Project control routes
router.post('/create-project/:userId', authMiddleware.isAuthenticated, projectController.createProject);
router.put('/update-project/:projectId', authMiddleware.isAuthenticated, projectController.updateProject);
router.delete('/delete-project/:projectId', authMiddleware.isAuthenticated, projectController.deleteProject);
router.get('/show-project/:projectId', authMiddleware.isAuthenticated, projectController.getProjectById);
router.get('/index-projects/user/:userId', authMiddleware.isAuthenticated, projectController.getAllProjectsByUserId);


// Task control routes
router.post('/create-task/:projectId', authMiddleware.isAuthenticated, taskController.createTask);
router.put('/update-task/:taskId', authMiddleware.isAuthenticated, taskController.updateTask);
router.delete('/delete-task/:taskId', authMiddleware.isAuthenticated, taskController.deleteTask);
router.get('/show-task/:taskId', authMiddleware.isAuthenticated, taskController.getTaskById);
router.get('/index-tasks/:projectId/', authMiddleware.isAuthenticated, taskController.getAllTasksByProjectId);

// Export tasks to excel routes
router.get('/export-tasks-to-excel/:projectId', taskController.exportTasksToExcel);


module.exports = router;
