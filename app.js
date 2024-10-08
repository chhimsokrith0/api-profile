const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/registerRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const projectDetailsRoutes = require('./routes/projectDetailsRoutes');
require('dotenv').config();  // Load environment variables from .env

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable CORS for all routes

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/project-details', projectDetailsRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
