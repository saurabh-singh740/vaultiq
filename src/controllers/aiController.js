const Prompt = require('../models/prompt.model');
const generatePrompts = require('../services/aiService');

// Top 10 allowed categories
const topCategories = [
  "Technology",
  "Science",
  "Health",
  "Education",
  "Entertainment",
  "Business",
  "Lifestyle",
  "Art",
  "Sports",
  "Politics"
];

exports.analyzePrompt = async (req, res) => {
  try {
    const { content, title } = req.body;

    // Generate AI analysis
    const aiResponse = await generatePrompts(content);

    // Extract category from AI response (assume AI sends full text)
    let aiCategory = "";
    const categoryMatch = aiResponse.match(/Category:\s*(.*)/i);
    if (categoryMatch && categoryMatch[1]) {
      aiCategory = categoryMatch[1].trim();
      // Normalize category to match top 10
      const matched = topCategories.find(cat => 
        cat.toLowerCase() === aiCategory.toLowerCase()
      );
      aiCategory = matched || "Other";
    } else {
      aiCategory = "Other";
    }

    // Save prompt with AI category
    const prompt = await Prompt.create({
      title,
      content,
      category: aiCategory,
      userId: req.userId,
      visibility: "private"
    });

    res.status(200).json({
      success: true,
      message: "Prompt analyzed & saved successfully",
      aiCategory,
      prompt
    });
  } catch (err) {
    console.error("❌ AI Analysis Error:", err);
    res.status(500).json({ success: false, message: "AI Analysis Failed" });
  }
};
