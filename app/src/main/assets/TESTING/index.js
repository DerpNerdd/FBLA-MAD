const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const userRoutes = require('./public/user');  // Ensure this path is correct

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sanchez1alan1:kingalan2007@fblamad.ceiav.mongodb.net/?retryWrites=true&w=majority&appName=FBLAMAD')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes from user.js
app.use('/api/users', userRoutes);

// Routes for HTML files
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/level.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'level.html'));
});

// Catch-all route for undefined routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html')); // Default to index.html for any undefined route
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
