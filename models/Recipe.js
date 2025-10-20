// backend/models/Recipe.js
const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: String,
  // store quantity as a free-form string so units (kg, g, grams) are preserved
  quantityPerPerson: String
});

const nutrientSchema = new mongoose.Schema({
  name: String,
  info: String // free-form (e.g. "Protein: 12g")
});

const recipeSchema = new mongoose.Schema({
  title: String,
  category: String,
  ingredients: [ingredientSchema],
  nutrients: [nutrientSchema]
});

module.exports = mongoose.model('Recipe', recipeSchema);
