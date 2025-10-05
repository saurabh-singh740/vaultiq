const express = require('express');
const router = express.Router();
const {
  getCommunityPrompts,
  getSingleCommunityPrompt,
} = require('../controllers/communityController');

// Public routes – no auth required
router.get('/', getCommunityPrompts);
router.get('/:id', getSingleCommunityPrompt);

module.exports = router;
