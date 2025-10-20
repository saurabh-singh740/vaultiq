import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Brain, Archive } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => setIsLoggedIn(!!localStorage.getItem("vaultiq_token"));

  useEffect(() => {
    checkLogin();
    const handleLogin = () => checkLogin();
    window.addEventListener("login", handleLogin);
    window.addEventListener("logout", handleLogin);
    return () => {
      window.removeEventListener("login", handleLogin);
      window.removeEventListener("logout", handleLogin);
    };
  }, []);

  const handleNavigatePrompts = () => {
    if (!isLoggedIn) return alert("Please login to manage prompts!");
    navigate("/prompts");
  };

  const handleLogout = () => {
    localStorage.removeItem("vaultiq_token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("logout"));
    navigate("/login");
  };

  const fadeOnly = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0 } } }; // no stagger delay

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0d17] to-[#1a1a2e] text-white font-inter overflow-x-hidden relative">
      {/* Floating Background Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

      {/* AUTH BUTTONS */}
      <div className="absolute top-4 right-6 flex gap-4 z-20">
        {isLoggedIn ? (
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-red-500 rounded-full hover:bg-red-600 transition"
          >
            Logout
          </motion.button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-purple-600 rounded-full hover:bg-purple-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-6 sm:px-12">
        <motion.h1
          variants={fadeOnly}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent z-10"
        >
          VaultIQ — Your Personal <span className="text-purple-500">PromptVault</span>
        </motion.h1>

        <motion.p
          variants={fadeOnly}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-5 text-lg text-gray-300 max-w-md z-10"
        >
          Save, organize, and retrieve your AI prompts effortlessly. Because powerful ideas deserve a secure home.
        </motion.p>

        <motion.button
          onClick={handleNavigatePrompts}
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-8 px-10 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg z-10"
        >
          Manage Your Prompts
        </motion.button>
      </section>

      {/* FEATURES */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible" // ✅ changed from whileInView
        className="py-16 px-6 sm:px-12"
      >
        <h2 className="text-3xl font-bold text-center mb-10">Why Use VaultIQ?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: <Archive size={36} />, title: "Prompt Organizer", desc: "Store and categorize your prompts with tags and AI topics for instant recall." },
            { icon: <Shield size={36} />, title: "Secure & Private", desc: "Every prompt is encrypted — your creative data stays yours, forever." },
            { icon: <Brain size={36} />, title: "Smart Insights", desc: "Get AI-powered suggestions and analytics for improving your prompt craft." },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={fadeOnly}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(128,0,255,0.6)" }}
              className="p-6 rounded-2xl bg-[#151520] shadow-lg border border-gray-800 hover:border-purple-500 transition-all"
            >
              <div className="text-purple-400 mb-4 flex justify-center">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-center">{f.title}</h3>
              <p className="text-gray-400 text-center">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* VISION */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} // ✅ changed
        transition={{ duration: 1 }}
        className="py-20 px-6 sm:px-12 bg-[#0e0e17] text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
        <p className="max-w-2xl mx-auto text-gray-400 leading-relaxed">
          VaultIQ empowers creators to manage their AI workflow efficiently, keeping prompts secure, searchable, and smartly enhanced.
        </p>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} // ✅ changed
        transition={{ duration: 1 }}
        className="py-6 text-center text-sm text-gray-500 border-t border-gray-800"
      >
        © {new Date().getFullYear()} VaultIQ — The Future of Prompt Intelligence.
      </motion.footer>
    </div>
  );
}

export default Home;
