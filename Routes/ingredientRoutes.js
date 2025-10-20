const express = require('express');
const router = express.Router();
const { createIngredient, listIngredients } = require('../Controllers/ingredientController');

router.post('/', createIngredient);
router.get('/', listIngredients);

module.exports = router;
