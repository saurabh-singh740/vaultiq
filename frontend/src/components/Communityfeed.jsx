import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaShareAlt, FaUser, FaGlobe, FaStar, FaHeart, FaComment } from "react-icons/fa";


const API_URL = "http://localhost:3000/api/community";

// ✅ Reusable Prompt Card with animations + icons
const PromptCard = ({ prompt, onView }) => (
  <motion.div
    onClick={() => onView(prompt._id)}
    whileHover={{ scale: 1.05, rotate: 1 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, type: "spring" }}
    className="border rounded-3xl p-5 shadow-xl bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 cursor-pointer hover:shadow-2xl hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 transition-all duration-500 relative overflow-hidden"
  >
    {/* Floating icon */}
    <motion.div
      className="absolute top-2 right-2 text-white/30 text-3xl"
      animate={{ rotate: [0, 360] }}
      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
    >
      <FaStar />
    </motion.div>

    <h3 className="text-lg font-bold text-white mb-2 animate-pulse flex items-center gap-2">
      {prompt.title} <FaGlobe className="text-yellow-300" />
    </h3>
    <p className="text-sm text-white/90 line-clamp-3">{prompt.description}</p>
    <p className="mt-2 text-xs text-white/70 flex items-center gap-1">
      <FaUser /> {prompt.userId?.email || "Anonymous"}
    </p>
    <div className="mt-3 flex gap-2 text-white/80">
      <FaHeart className="hover:text-red-500 transition-all duration-300 cursor-pointer" />
      <FaComment className="hover:text-blue-300 transition-all duration-300 cursor-pointer" />
    </div>
  </motion.div>
);

// ✅ Share Button Component with icon
const SharePromptButton = ({ promptId }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleShare = async () => {
    const token = localStorage.getItem("vaultiq_token");
    if (!token) {
      setMessage("⚠️ You must be logged in to share.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${API_URL}/share/${promptId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error("Error sharing prompt:", err);
      setMessage(err.response?.data?.message || "Failed to share prompt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <motion.button
        onClick={handleShare}
        disabled={loading}
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center gap-2 justify-center"
      >
        <FaShareAlt /> {loading ? "Sharing..." : "Share to Community"}
      </motion.button>
      {message && <p className="text-sm text-white/90 mt-2 animate-fadeIn">{message}</p>}
    </div>
  );
};

// ✅ Prompt Detail Component with icons
const PromptDetail = ({ id, onBack }) => {
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrompt = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setPrompt(res.data.data);
      } catch (err) {
        console.error("Error fetching single prompt:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPrompt();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-white animate-pulse">Loading prompt details...</p>;

  if (!prompt)
    return (
      <div className="p-4">
        <button
          onClick={onBack}
          className="text-sm text-blue-400 hover:underline mb-3 flex items-center gap-1"
        >
          ← Back <FaGlobe />
        </button>
        <p className="text-white">Prompt not found.</p>
      </div>
    );

  return (
    <motion.div
      className="p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl shadow-2xl relative z-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <button
        onClick={onBack}
        className="text-sm text-white hover:underline mb-3 flex items-center gap-1"
      >
        ← Back <FaGlobe />
      </button>

      <h2 className="text-2xl font-bold text-white mb-3 animate-pulse flex items-center gap-2">
        {prompt.title} <FaStar />
      </h2>
      <p className="text-white/90 mb-4">{prompt.description}</p>
      <p className="text-xs text-white/70 mb-4 flex items-center gap-1">
        <FaUser /> Created by: {prompt.userId?.email}
      </p>

      <SharePromptButton promptId={id} />
    </motion.div>
  );
};

// ✅ Main Community Feed Component with floating icons
const CommunityFeed = () => {
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const res = await axios.get(API_URL);
        setPrompts(res.data.data);
      } catch (err) {
        console.error("Error fetching community prompts:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPrompts();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-white animate-pulse">
        Loading community prompts...
      </p>
    );

  return (
    <div className="relative p-6 min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 text-white">
      {/* 🎨 Animated floating blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-reverse"></div>
        <motion.div
          className="absolute top-20 left-1/4 text-white/20 text-6xl animate-float"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <FaStar />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-1/3 text-white/20 text-7xl animate-float-slow"
          animate={{ rotate: [360, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          <FaHeart />
        </motion.div>
      </div>

      <div className="relative z-10">
        <motion.h2
          className="text-3xl font-extrabold mb-6 animate-bounce flex items-center gap-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          🌍 Community Prompts <FaGlobe />
        </motion.h2>

        {selectedPrompt ? (
          <PromptDetail id={selectedPrompt} onBack={() => setSelectedPrompt(null)} />
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {prompts.map((prompt) => (
              <PromptCard key={prompt._id} prompt={prompt} onView={setSelectedPrompt} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;
