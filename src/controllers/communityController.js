const Prompt = require('../models/prompt.model');

// GET all public prompts (Community feed)
exports.getCommunityPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find({ visibility: 'public' })
      .populate('userId', 'email') // optional: show creator email
      .sort({ createdAt: -1 });

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

// POST – Share a prompt to community (only owner)
exports.sharePromptToCommunity = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Find the prompt
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

  

    // Step 3: Authorization check
    if (prompt.userId.toString() !== req.userId) {
      console.log('❌ Authorization failed: user is not the owner');
      return res.status(403).json({ message: 'Not authorized to share this prompt' });
    }

    // Step 4: Already public check
    if (prompt.visibility === 'public') {
      return res.status(200).json({ message: 'Prompt is already public' });
    }

    // Step 5: Share prompt
    prompt.visibility = 'public';
    await prompt.save();

    // Step 6: Success response
    return res.status(200).json({ message: 'Prompt shared to community successfully!' });

  } catch (error) {
    console.error('Error in sharePromptToCommunity:', error);
    return res.status(500).json({ message: 'Server error while sharing prompt' });
  }
};
