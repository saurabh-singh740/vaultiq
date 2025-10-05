const Prompt = require('../models/prompt.model');

// GET all public prompts
exports.getCommunityPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find({ visibility: 'public' })
      .populate('userId', 'email') // optional: show user email
      .sort({ createdAt: -1 });    // latest first

    res.status(200).json({
      success: true,
      count: prompts.length,
      data: prompts,
    });
  } catch (err) {
    console.error('Error fetching community prompts:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET a single public prompt by ID
exports.getSingleCommunityPrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findOne({
      _id: req.params.id,
      visibility: 'public',
    }).populate('userId', 'email');

    if (!prompt) {
      return res.status(404).json({ success: false, message: 'Prompt not found' });
    }

    res.status(200).json({ success: true, data: prompt });
  } catch (err) {
    console.error('Error fetching prompt:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
