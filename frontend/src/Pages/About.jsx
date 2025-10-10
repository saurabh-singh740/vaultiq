import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaAward, FaLightbulb } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 text-white flex flex-col items-center px-4 py-10 md:py-16">
      
      {/* Header */}
      <motion.h1
        className="text-3xl md:text-5xl font-extrabold flex items-center gap-3 mb-6 md:mb-10 animate-bounce text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        🧑 About Me <FaUser className="text-yellow-400" />
      </motion.h1>

      {/* Personal Info */}
      <motion.div
        className="w-full max-w-5xl bg-[#1f1f3b] p-6 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-4 md:gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-yellow-400 flex items-center gap-2"><FaUser /> Saurabh Singh</h2>
        <p className="text-gray-300 text-base md:text-lg">
          I'm the creator of <span className="font-semibold text-purple-400">VaultIQ</span>, a personal AI prompt management platform. I build tools that empower creators and developers to organize their AI workflow effectively, securely, and smartly.
        </p>
      </motion.div>

      {/* Achievements */}
      <motion.div
        className="w-full max-w-5xl bg-[#1f1f3b] p-6 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-4 md:gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-yellow-400 flex items-center gap-2"><FaAward /> Achievements</h2>
        <ul className="list-disc list-inside text-gray-300 text-base md:text-lg space-y-1">
          <li>Created VaultIQ — a secure and smart AI prompt vault.</li>
          <li>Ranked top 100 in coding hackathons among thousands of participants.</li>
          <li>Skilled in full-stack development, AI integration, and productivity tools.</li>
          <li>Building projects that simplify workflow and enhance creativity for tech enthusiasts.</li>
        </ul>
      </motion.div>

      {/* Vision */}
      <motion.div
        className="w-full max-w-5xl bg-[#1f1f3b] p-6 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-4 md:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-yellow-400 flex items-center gap-2"><FaLightbulb /> Vision</h2>
        <p className="text-gray-300 text-base md:text-lg">
          My mission is to make AI prompt management seamless, secure, and highly intuitive. VaultIQ empowers creators to focus on ideas, not on organizing them — providing a smart, efficient, and reliable workspace for everyone exploring AI creativity.
        </p>
      </motion.div>

    </div>
  );
};

export default About;
