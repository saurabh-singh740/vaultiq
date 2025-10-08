const promptModel = require("../models/prompt.model");

// ✅ Create
async function createPrompt(req, res) {
    try {
        const { title, content, category, tags, visibility } = req.body;

        const prompt = await promptModel.create({
            title,
            content,
            category,
            tags,
            visibility,
            userId: req.userId,
        });

        res.status(201).json(prompt);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// ✅ Read (all for current user)
async function getUserPrompts(req, res) {
    try {
        const prompts = await promptModel.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(prompts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// ✅ Read (single prompt)
async function getPromptById(req, res) {
    try {
        const prompt = await promptModel.findOne({ _id: req.params.id, userId: req.userId });
        if (!prompt) return res.status(404).json({ message: "Prompt not found" });
        res.json(prompt);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// ✅ Update
async function updatePrompt(req, res) {
    try {
        const updated = await promptModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Prompt not found" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// ✅ Delete
async function deletePrompt(req, res) {
    try {
        const deleted = await promptModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });
        if (!deleted) return res.status(404).json({ message: "Prompt not found" });
        res.json({ message: "Prompt deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createPrompt,
    getUserPrompts,
    getPromptById,
    updatePrompt,
    deletePrompt,
};
