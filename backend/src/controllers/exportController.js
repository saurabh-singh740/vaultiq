const Prompt = require('../models/prompt.model');
const pdfService = require('../services/pdfService');

// Helper to format title uniquely
const formatTitle = (prompt) => `${prompt.title || 'Untitled Prompt'} (${new Date(prompt.createdAt).toLocaleString()})`;

// Export as JSON
exports.exportPromptsJSON = async (req, res) => {
  try {
    const prompts = await Prompt.find({ userId: req.userId }).sort({ createdAt: -1 });
    if (!prompts.length) {
      return res.status(404).json({ success: false, message: 'No prompts found for this user' });
    }

    // Include formatted title for clarity
    const jsonData = prompts.map(p => ({
      ...p.toObject(),
      formattedTitle: formatTitle(p),
    }));

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=prompts.json');
    res.status(200).send(JSON.stringify(jsonData, null, 2));
  } catch (err) {
    console.error('❌ JSON export failed:', err);
    res.status(500).json({ success: false, message: 'Error exporting prompts as JSON' });
  }
};

// Export as PDF
exports.exportPromptsPDF = async (req, res) => {
  try {
    const prompts = await Prompt.find({ userId: req.userId }).sort({ createdAt: -1 });
    if (!prompts.length) {
      return res.status(404).json({ success: false, message: 'No prompts found for this user' });
    }

    // Add formatted title in content before generating PDF
    const pdfBuffer = await pdfService.generatePromptsPDF(
      prompts.map(p => ({
        ...p.toObject(),
        formattedTitle: formatTitle(p),
      }))
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=prompts.pdf');
    res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error('❌ PDF export failed:', err);
    res.status(500).json({ success: false, message: 'Error exporting prompts as PDF' });
  }
};
