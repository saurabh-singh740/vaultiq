import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPaperPlane, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_x16cpnk";   // EmailJS Service ID
const TEMPLATE_ID = "template_bzt0uxd"; // EmailJS Template ID
const USER_ID = "3D4s8dXBVzSuUQ_S6";   // EmailJS Public Key

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = { from_name: name, from_email: email, message: message };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(() => {
        setSuccess(true);
        setName(""); setEmail(""); setMessage("");
        setTimeout(() => setSuccess(false), 4000);
      })
      .catch(() => alert("Failed to send message. Please try again!"))
      .finally(() => setLoading(false));
  };

  const socials = [
    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/saurabh-singh-00322324b" },
    { icon: <FaGithub />, link: "https://github.com/saurabh-singh740" },
    { icon: <FaInstagram />, link: "https://instagram.com/saurabhsingh0.1" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 text-white flex flex-col items-center px-4 py-10 md:py-16">
      
      {/* Header */}
      <motion.h1
        className="text-3xl md:text-5xl font-extrabold flex items-center gap-3 mb-6 md:mb-10 animate-bounce text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        📬 Contact VaultIQ <FaEnvelope className="text-yellow-400" />
      </motion.h1>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-700 p-6 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-4 md:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} 
          className="p-4 rounded-xl border-none text-black font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full" required />
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} 
          className="p-4 rounded-xl border-none text-black font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full" required />
        <textarea rows={6} placeholder="Your Message..." value={message} onChange={(e) => setMessage(e.target.value)} 
          className="p-4 rounded-xl border-none text-black font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none w-full" required />

        <motion.button type="submit" disabled={loading}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl shadow-lg font-semibold hover:shadow-2xl transition-all duration-500 text-lg w-full md:w-auto mx-auto
            ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"}`}>
          <FaPaperPlane /> {loading ? "Sending..." : "Send Message"}
        </motion.button>

        {success && <p className="text-green-400 font-semibold animate-pulse mt-2 text-center">Message sent successfully!</p>}
      </motion.form>

      {/* Social Links */}
      <div className="flex gap-6 mt-10">
        {socials.map((s, i) => (
          <motion.a
            key={i}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.2, color: "#facc15" }}
            whileTap={{ scale: 0.9 }}
            className="text-3xl text-white transition-colors duration-300"
          >
            {s.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
