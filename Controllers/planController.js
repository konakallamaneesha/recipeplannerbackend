const Plan = require('../models/Plan');

exports.createPlan = async (req, res) => {
  try {
    const { username, day, meals } = req.body;
    if (!username) return res.status(400).json({ error: 'username required' });
    if (!day) return res.status(400).json({ error: 'day required' });
    const p = new Plan({ username, day, meals: meals || {} });
    await p.save();
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
};

exports.listPlans = async (req, res) => {
  try {
    const { username } = req.query;
    const q = username ? { username } : {};
    const items = await Plan.find(q).populate('meals.breakfast.recipeId meals.lunch.recipeId meals.dinner.recipeId');
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
};
