import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaFilePdf, FaFileCode, FaCloudDownloadAlt } from "react-icons/fa";

const ExportPrompts = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleExport = async (type) => {
    setLoading(true);
    setMessage("");
    const token = localStorage.getItem("vaultiq_token");

    if (!token) {
      setMessage("⚠️ Please login first to export your prompts.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://vaultiq-37wz.onrender.com/api/export/${type}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      // Create a download link dynamically
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute(
        "download",
        type === "json" ? "prompts.json" : "prompts.pdf"
      );
      document.body.appendChild(fileLink);
      fileLink.click();

      setMessage(`✅ Prompts exported successfully as ${type.toUpperCase()}!`);
    } catch (err) {
      console.error("Export failed:", err);
      setMessage("❌ Failed to export prompts. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-purple-800 to-indigo-900 text-white">
      {/* 🎨 Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-pink-500 opacity-30 rounded-full filter blur-3xl top-10 left-10 animate-pulse"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 6 }}
        ></motion.div>
        <motion.div
          className="absolute w-80 h-80 bg-indigo-500 opacity-20 rounded-full filter blur-3xl bottom-10 right-10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 7 }}
        ></motion.div>
      </div>

      {/* 💫 Page Header */}
      <motion.h1
        className="text-3xl md:text-5xl font-extrabold text-center mb-10 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        📤 Export Your <span className="text-pink-400">Prompts</span>
      </motion.h1>

      {/* 🔘 Export Buttons */}
      <motion.div
        className="flex flex-col md:flex-row gap-6 z-10 w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <motion.button
          onClick={() => handleExport("json")}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(255,255,255,0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 px-6 py-4 rounded-2xl shadow-lg text-lg font-semibold transition-all duration-500 hover:from-blue-500 hover:to-pink-600"
        >
          <FaFileCode className="text-2xl" /> Export as JSON
        </motion.button>

        <motion.button
          onClick={() => handleExport("pdf")}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(255,255,255,0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 px-6 py-4 rounded-2xl shadow-lg text-lg font-semibold transition-all duration-500 hover:from-red-500 hover:to-yellow-600"
        >
          <FaFilePdf className="text-2xl" /> Export as PDF
        </motion.button>
      </motion.div>

      {/* 🌈 Status Message */}
      {message && (
        <motion.p
          className="mt-6 text-center text-sm sm:text-base text-white/90 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.p>
      )}

      {/* 📦 Floating Icon for vibe */}
      <motion.div
        className="absolute bottom-10 text-white/20 text-6xl"
        animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <FaCloudDownloadAlt />
      </motion.div>
    </div>
  );
};

export default ExportPrompts;
