// backend/seed.js
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Recipe = require('./models/Recipe');
const User = require('./models/User');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // clear existing
    await Recipe.deleteMany({});
    await User.deleteMany({});

    const recipes = [
    {
      title: 'Spaghetti Bolognese',
      ingredients: [
        { name: 'Spaghetti', quantityPerPerson: 100 },
        { name: 'Ground beef', quantityPerPerson: 150 },
        { name: 'Tomato sauce', quantityPerPerson: 100 }
      ]
    },
    {
      title: 'Chicken Salad',
      ingredients: [
        { name: 'Chicken breast', quantityPerPerson: 150 },
        { name: 'Lettuce', quantityPerPerson: 50 },
        { name: 'Dressing', quantityPerPerson: 20 }
      ]
    }
  ];

  await Recipe.insertMany(recipes);
  console.log('Inserted sample recipes');

  const passwordHash = await bcrypt.hash('password', 10);
  await User.create({ username: 'test', password: passwordHash });
  console.log('Created test user (username: test, password: password)');
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  } finally {
    try { await mongoose.disconnect(); } catch (e) { /* ignore */ }
  }
}

seed();
