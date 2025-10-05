const Prompt = require('../models/prompt.model');
const pdfService = require('../services/pdfService');
// const notionService = require('../services/notionService'); // optional

// Export prompts as JSON
exports.exportPromptsJSON = async (req, res) => {
  try {
    // Fetch all prompts of the authenticated user
    const prompts = await Prompt.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=prompts.json');
    res.status(200).send(JSON.stringify(prompts, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error exporting prompts as JSON' });
  }
};

// Export prompts as PDF
exports.exportPromptsPDF = async (req, res) => {
  try {
    const prompts = await Prompt.find({ userId: req.userId }).sort({ createdAt: -1 });

    const pdfBuffer = await pdfService.generatePromptsPDF(prompts);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=prompts.pdf');
    res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error exporting prompts as PDF' });
  }
};

// Optional: Export to Notion
exports.exportPromptsToNotion = async (req, res) => {
  try {
    // const result = await notionService.pushPromptsToNotion(req.userId);
    // res.status(200).json({ success: true, data: result });
    res.status(200).json({ success: true, message: 'Notion export placeholder' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error exporting prompts to Notion' });
  }
};
