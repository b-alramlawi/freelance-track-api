// app.js
require('./configurations/db');
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
