// backend/routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const { createRecipe, getRecipes, calculateIngredients } = require('../Controllers/recipeController');

router.post('/', createRecipe);
router.get('/', getRecipes);
router.post('/calculate', calculateIngredients);

module.exports = router;
