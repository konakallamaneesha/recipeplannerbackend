const Ingredient = require('../models/Ingredient');

exports.createIngredient = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'name required' });
    // use case-insensitive match to avoid duplicate ingredients with different casing
    const existing = await Ingredient.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
    if (existing) {
      // return the existing ingredient (idempotent) so client flows don't fail on 409
      return res.json(existing);
    }
    const ing = new Ingredient({ name });
    await ing.save();
    res.json(ing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
};

exports.listIngredients = async (req, res) => {
  try {
    const items = await Ingredient.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
};
