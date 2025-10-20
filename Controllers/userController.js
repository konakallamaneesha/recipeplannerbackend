// backend/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });
    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ error: 'user exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ success: false });
    const match = await bcrypt.compare(password, user.password);
    if (match) res.json({ success: true });
    else res.status(401).json({ success: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
