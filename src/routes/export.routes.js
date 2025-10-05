const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');

// Export all prompts as JSON
router.get('/json', exportController.exportPromptsJSON);

// Export all prompts as PDF
router.get('/pdf', exportController.exportPromptsPDF);

// Optional: Export to Notion (if integrated)
router.post('/notion', exportController.exportPromptsToNotion);

module.exports = router;
