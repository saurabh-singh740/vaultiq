import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaRobot,
  FaHome,
  FaLightbulb,
  FaUsers,
  FaFileExport,
  FaBrain,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);

  const links = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Prompts", path: "/prompts", icon: <FaLightbulb /> },
    { name: "Community", path: "/community", icon: <FaUsers /> },
    { name: "Export", path: "/export", icon: <FaFileExport /> },
    { name: "AI Analyzer", path: "/analyze", icon: <FaBrain /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
    { name: "Contact", path: "/contact", icon: <FaEnvelope /> },
  ];

  const handleClick = (name) => {
    setClickedLink(name);
    setTimeout(() => setClickedLink(null), 600);
    setOpen(false);
  };

  const floatAnimation = {
    initial: { y: 0, scale: 1 },
    animate: { y: -5, scale: 1.05 },
    transition: { yoyo: Infinity, duration: 0.6, ease: "easeInOut" },
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-purple-800 via-pink-700 to-indigo-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-white font-extrabold text-2xl flex items-center gap-2">
          <FaRobot className="text-yellow-400" /> VaultIQ
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <motion.div
              key={link.name}
              animate={clickedLink === link.name ? floatAnimation.animate : { y: 0, scale: 1 }}
              transition={floatAnimation.transition}
              className="flex items-center gap-1"
            >
              <NavLink
                to={link.path}
                onClick={() => handleClick(link.name)}
                className={({ isActive }) =>
                  `text-white font-semibold hover:text-yellow-400 transition-colors duration-300 flex items-center gap-1 ${
                    isActive ? "underline decoration-yellow-400" : ""
                  }`
                }
              >
                {link.icon} {link.name}
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-white text-2xl">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gradient-to-b from-purple-800 via-pink-700 to-indigo-800 px-4 py-6 flex flex-col gap-4"
          >
            {links.map((link) => (
              <motion.div
                key={link.name}
                animate={clickedLink === link.name ? floatAnimation.animate : { y: 0, scale: 1 }}
                transition={floatAnimation.transition}
                className="flex items-center gap-2"
              >
                <NavLink
                  to={link.path}
                  onClick={() => handleClick(link.name)}
                  className={({ isActive }) =>
                    `text-white font-semibold text-lg hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 ${
                      isActive ? "underline decoration-yellow-400" : ""
                    }`
                  }
                >
                  {link.icon} {link.name}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
