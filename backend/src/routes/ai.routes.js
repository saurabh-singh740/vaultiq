// routes/ai.routes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/authmiddleware');

// 🔹 Analyze and categorize user prompt using AI
router.post('/analyze', authMiddleware, aiController.analyzePrompt);

module.exports = router;
