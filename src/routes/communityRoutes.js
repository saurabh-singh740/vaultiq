const express = require('express');
const router = express.Router();
const {
  getCommunityPrompts,
  getSingleCommunityPrompt,
  sharePromptToCommunity
} = require('../controllers/communityController');
const authMiddleware = require('../middleware/authmiddleware');

// Public routes
router.get('/', getCommunityPrompts);
router.get('/:id', getSingleCommunityPrompt);

// Protected route – Share a user prompt to community
router.post('/share/:id', authMiddleware, sharePromptToCommunity);

module.exports = router;
