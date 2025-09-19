const express = require('express');
const router = express.Router();
const { getBugHistory, getInsights } = require('../controllers/bugController');

router.get('/history', getBugHistory);
router.get('/insights', getInsights);

module.exports = router;
