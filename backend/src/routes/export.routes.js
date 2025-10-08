const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');
const authMiddleware = require('../middleware/authmiddleware'); // 👈 add this

// Export all prompts as JSON
router.get('/json', authMiddleware, exportController.exportPromptsJSON);

// Export all prompts as PDF
router.get('/pdf', authMiddleware, exportController.exportPromptsPDF);

module.exports = router;
