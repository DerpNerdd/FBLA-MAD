const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://sanchez1alan1:kingalan2007@fblamad.ceiav.mongodb.net/?retryWrites=true&w=majority&appName=FBLAMAD', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Serve static files from the "assets/TESTING" directory
app.use(express.static(path.join(__dirname)));

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const userRoutes = require('./user');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
