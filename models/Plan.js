const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  people: { type: Number, default: 1 }
}, { _id: false });

const planSchema = new mongoose.Schema({
  username: { type: String, required: true },
  day: { type: String, required: true },
  meals: {
    breakfast: mealSchema,
    lunch: mealSchema,
    dinner: mealSchema
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plan', planSchema);
