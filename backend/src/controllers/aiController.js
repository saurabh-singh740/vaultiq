const Prompt = require('../models/prompt.model');
const generatePrompts = require('../services/aiService');

const topCategories = [
  "Technology", "Science", "Health", "Education", "Entertainment",
  "Business", "Lifestyle", "Art", "Sports", "Politics",
  "Environment", "Finance", "History", "Culture", "Food",
  "Travel", "AI", "Software", "Hardware", "Social Media"
];

exports.analyzePrompt = async (req, res) => {
  try {
    const { content, title } = req.body;

    const aiResponse = await generatePrompts(content, {
      prompt: `Classify this content into a single category from the list: ${topCategories.join(", ")}. 
Return ONLY the category name in plain text.`
    });

    let aiCategory = "Other";

    // ✅ Clean the AI output: remove ```json blocks and extract category
    const cleaned = aiResponse.replace(/```json|```/gi, "").trim();

    try {
      const parsed = JSON.parse(cleaned); // agar JSON hai
      if (parsed.category) aiCategory = parsed.category.trim();
    } catch {
      // fallback: plain text
      aiCategory = cleaned.split("\n")[0].trim();
    }

    // Normalize with topCategories
    const matched = topCategories.find(cat => cat.toLowerCase() === aiCategory.toLowerCase());
    aiCategory = matched || aiCategory;

    // Save prompt
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
