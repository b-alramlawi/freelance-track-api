# Freelance Track API

![nodemongo](https://github.com/b-alramlawi/freelance-track-api/assets/63581864/b53e2a48-524d-494e-b86f-71d3a0780837)

## Description

The Freelance Track API is a powerful tool for managing freelance projects and tasks. It provides a robust set of features to streamline project planning, tracking, and user management. This API is built using Node.js and Express.js for the backend, with MongoDB as the database. Postman was used for testing the API endpoints.

## Features

### User Management

- **Signup and Registration:** Users can effortlessly create new accounts, providing essential information including their email, username, password, and hourly rate. The system ensures security and trust by sending email verification for seamless account activation.

- **Login:** Registered users can securely access their accounts using their email and password. Upon successful login, they receive a JWT token for robust authentication and secure interactions.

- **Logout:** Users have the capability to conclude their active sessions with confidence, ensuring the protection of their accounts and data.

### Profile Management

- **Profile Picture Upload:** Users have the flexibility to personalize their profiles by uploading and updating profile pictures. These visuals are closely associated with their accounts, enhancing user engagement and recognition.

### Email Verification

- **Email Verification Link:** To confirm the validity of their email addresses, users receive prompt email verification links upon registration. This additional layer of security enhances the trustworthiness of the platform.

### Password Management

- **Forgot Password:** In cases of forgotten passwords, users can conveniently request password reset emails. This process is initiated by providing their registered email address.

- **Password Reset:** Password resets are executed with utmost security, allowing users to regain access to their accounts through a secure reset token delivered to their email.

### Project Management

- **Project Creation:** Users can efficiently create new freelance projects, offering comprehensive project details including title, description, status, due date, and tags. This streamlines project initiation and planning.

- **Project Update:** To maintain up-to-date project information, users can effortlessly update project details, encompassing title, description, status, due date, and tags. This flexibility enhances project management.

- **Project Deletion:** Users possess the ability to securely delete projects they own, ensuring an organized project portfolio.

### Task Management

- **Task Creation:** Users can seamlessly create tasks associated with specific projects, providing intricate task details such as title, description, status, due date, estimated hours, and notes. This facilitates comprehensive task planning and tracking.

- **Task Update:** Keeping tasks aligned with project goals is simplified as users can efficiently update task details, encompassing title, description, status, due date, estimated hours, and notes. This enhances task management.

- **Task Deletion:** Users can confidently remove tasks when necessary, ensuring a clutter-free and efficient project workspace.

### Project and Task Retrieval

- **Get Project by ID:** Users can retrieve detailed project information by specifying the project's unique identifier. This streamlines project-focused inquiries.

- **Get All Projects by User ID:** For efficient project management, users can retrieve a comprehensive list of all projects associated with their account. Pagination support ensures seamless navigation.

- **Get Task by ID:** Users can access specific task details by specifying the task's unique identifier. This simplifies task-centric inquiries.

- **Get All Tasks by Project ID:** To streamline project progress tracking, users can retrieve a comprehensive list of tasks associated with a specific project. Pagination support facilitates easy navigation.

### Export Tasks to Excel

- **Export to Excel:** Users can efficiently export project tasks to Excel files, allowing for comprehensive project data analysis and reporting. This feature enhances project management and decision-making capabilities.

## Installation

To install and use the Freelance Track API, follow these steps:

1. Clone the repository.
2. Install the required dependencies using `npm install`.
3. Configure your environment variables.
4. Run the application using `npm start`.

## Usage

1. Register a new account.
2. Log in to access your dashboard.
3. Create and manage your freelance projects and tasks.
4. Utilize the export feature for in-depth project analysis.

## Backend Technologies

- **Node.js**: The backend server is built using Node.js, providing a robust and asynchronous runtime environment.

- **Express.js**: Express.js is used as the web application framework, simplifying the creation of RESTful APIs and handling routing.

- **MongoDB**: MongoDB serves as the database system, offering flexibility and scalability for data storage.

- **Authentication**: JWT (JSON Web Tokens) are used for secure user authentication and authorization.

## Project Structure

The project follows a modular and organized structure, separating components like controllers, models, routes, and middleware. This structure promotes maintainability and code separation.

![MVC3](https://github.com/b-alramlawi/freelance-track-api/assets/63581864/5ee70c71-3f60-4d70-b7b4-abc4cec167a5)


## Data Modeling

The application uses Mongoose, an ODM (Object-Document Mapper), for modeling data and interacting with the MongoDB database.

## API Endpoints

RESTful API endpoints are defined for various operations, including user management, project and task creation, and retrieval.

## Testing

Postman is utilized for thorough API testing, ensuring the reliability and functionality of each endpoint.
