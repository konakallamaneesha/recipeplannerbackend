const express = require('express');
const router = express.Router();
const { createPlan, listPlans } = require('../Controllers/planController');

router.post('/', createPlan);
router.get('/', listPlans);

module.exports = router;
