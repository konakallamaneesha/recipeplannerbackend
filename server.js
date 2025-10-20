// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const recipeRoutes = require('./Routes/recipeRoutes');
const userRoutes = require('./Routes/userRoutes');
const ingredientRoutes = require('./Routes/ingredientRoutes');
const planRoutes = require('./Routes/planRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/plans', planRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)).on('error', err => console.error('Server error:', err));
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err));
