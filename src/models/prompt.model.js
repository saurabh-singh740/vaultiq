const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    tags: [String],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    visibility: {
        type: String,
        enum: ["private", "public"],
        default: "private"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const promptModel = mongoose.model("Prompt", promptSchema);

module.exports = promptModel;
