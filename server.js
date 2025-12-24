// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express(); // ✅ app MUST come before app.get / app.use

// Middleware
app.use(cors({
  origin: 'https://recipeplannerfrontend.vercel.app',
  credentials: true
}));
app.use(express.json());

// Health check route (for Render cold start)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
const recipeRoutes = require('./Routes/recipeRoutes');
const userRoutes = require('./Routes/userRoutes');
const ingredientRoutes = require('./Routes/ingredientRoutes');
const planRoutes = require('./Routes/planRoutes');

app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/plans', planRoutes);

// Server + DB
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });
