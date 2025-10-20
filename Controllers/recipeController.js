// backend/controllers/recipeController.js
const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, category, nutrients } = req.body;
    if (!title) return res.status(400).json({ error: 'title required' });
    const recipe = new Recipe({ title, ingredients: ingredients || [], category: category || '', nutrients: nutrients || [] });
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const { category } = req.query;
    const q = category ? { category } : {};
    const recipes = await Recipe.find(q);
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
};

exports.calculateIngredients = async (req, res) => {
  try {
    const { recipeId, people } = req.body;
    const numPeople = Number(people) || 1;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ error: 'recipe not found' });
    // For each ingredient, quantityPerPerson may be a string like "100 grams" or "0.1 kg".
    // We parse a leading numeric part and multiply it by numPeople. If parsing fails, we return the original string.
    const totalIngredients = (recipe.ingredients || []).map(ing => {
      const q = ing.quantityPerPerson || '';
      // try to find a numeric prefix (integer or float)
      const m = String(q).trim().match(/^([0-9]*\.?[0-9]+)\s*(.*)$/);
      if (m) {
        const value = parseFloat(m[1]);
        const unit = (m[2] || '').trim();
        const total = value * numPeople;
        // if unit exists, keep it; format total with up to 3 decimals trimmed
        const formatted = (Math.round((total + Number.EPSILON) * 1000) / 1000).toString();
        return { name: ing.name, totalQuantity: unit ? `${formatted} ${unit}` : formatted };
      }
      // fallback: cannot parse numeric part, return repeated string
      return { name: ing.name, totalQuantity: `${q} x ${numPeople}` };
    });
    res.json(totalIngredients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
};
