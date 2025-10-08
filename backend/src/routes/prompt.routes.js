const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware")
const promptController = require("../controllers/prompt.controller");

// CRUD Routes
router.post("/", authMiddleware, promptController.createPrompt);
router.get("/", authMiddleware, promptController.getUserPrompts);
router.get("/:id", authMiddleware, promptController.getPromptById);
router.put("/:id", authMiddleware, promptController.updatePrompt);
router.delete("/:id", authMiddleware, promptController.deletePrompt);

module.exports = router;
