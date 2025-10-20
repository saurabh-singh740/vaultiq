import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaRobot, FaPaperPlane, FaLightbulb } from "react-icons/fa";

const API_URL = "https://vaultiq-37wz.onrender.com/api/ai/analyze";

const AIPromptAnalyzer = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiCategory, setAICategory] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");
    setAICategory("");

    try {
      const token = localStorage.getItem("vaultiq_token");
      const res = await axios.post(
        API_URL,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data.prompt);
      setAICategory(res.data.aiCategory);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 text-white flex flex-col items-center px-4 py-10 md:py-16">
      
      {/* Header */}
      <motion.h1
        className="text-3xl md:text-5xl font-extrabold flex items-center gap-3 mb-6 md:mb-10 animate-bounce text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        🤖 AI Prompt Analyzer <FaRobot className="text-yellow-400" />
      </motion.h1>

      {/* Why / When Section */}
      <motion.div
        className="w-full max-w-5xl bg-[#1f1f3b] p-6 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-4 md:gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 text-yellow-400">
          <FaLightbulb size={24} /> 
          <h2 className="text-xl md:text-2xl font-semibold">Why & When to Use Prompt Analyzer</h2>
        </div>
        <p className="text-gray-300 text-base md:text-lg">
          The AI Prompt Analyzer helps you categorize, optimize, and understand your prompts. Use it when you want to:
        </p>
        <ul className="list-disc list-inside text-gray-300 text-base md:text-lg space-y-1">
          <li>Identify the category of your prompt for better organization.</li>
          <li>Improve clarity and effectiveness of your prompts.</li>
          <li>Ensure prompts are structured for optimal AI responses.</li>
          <li>Save time analyzing large prompt content quickly.</li>
        </ul>
      </motion.div>

      {/* Form Section */}
      <motion.form
        onSubmit={handleAnalyze}
        className="w-full max-w-5xl bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-700 p-6 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-4 md:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <input
          type="text"
          placeholder="Prompt Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-4 rounded-xl border-none text-black font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
          required
        />
        <textarea
          rows={6}
          placeholder="Write your prompt content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-4 rounded-xl border-none text-black font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none w-full"
          required
        />

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-xl shadow-lg font-semibold hover:shadow-2xl transition-all duration-500 text-lg w-full md:w-auto mx-auto"
        >
          <FaPaperPlane /> {loading ? "Analyzing..." : "Analyze Prompt"}
        </motion.button>

        {error && <p className="text-red-400 font-semibold animate-pulse mt-2 text-center">{error}</p>}
      </motion.form>

      {/* Result Section */}
      {result && (
        <motion.div
          className="mt-10 w-full max-w-5xl min-h-[50vh] bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-6 md:p-10 rounded-3xl shadow-2xl text-white flex flex-col gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 animate-pulse text-center">📌 Prompt Details</h3>
          <p className="mb-2 text-lg md:text-xl"><span className="font-semibold">Title:</span> {result.title}</p>
          <p className="mb-2 text-lg md:text-xl"><span className="font-semibold">Content:</span> {result.content}</p>
          <p className="mb-2 text-lg md:text-xl"><span className="font-semibold">Category:</span> {aiCategory}</p>
          <p className="text-sm md:text-base text-white/80 mt-2 text-right">Created At: {new Date(result.createdAt).toLocaleString()}</p>
        </motion.div>
      )}
    </div>
  );
};

export default AIPromptAnalyzer;
