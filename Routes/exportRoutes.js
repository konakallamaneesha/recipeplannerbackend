const express = require('express');
const router = express.Router();

// exports routes disabled
router.get('/', (req, res) => res.status(404).json({ error: 'exports routes disabled' }));

module.exports = router;
