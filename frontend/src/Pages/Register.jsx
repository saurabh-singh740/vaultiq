import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        email: formData.email,
        password: formData.password,
      };

      await axios.post("https://vaultiq-37wz.onrender.com/api/auth/register", payload, {
        withCredentials: true,
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
          Create your Vaultiq
        </h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-200 text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              value={formData.firstname}
              onChange={handleChange}
              className="w-1/2 bg-white/20 text-white placeholder-gray-200 px-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              value={formData.lastname}
              onChange={handleChange}
              className="w-1/2 bg-white/20 text-white placeholder-gray-200 px-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/20 text-white placeholder-gray-200 px-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/20 text-white placeholder-gray-200 px-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-xl font-semibold hover:opacity-90 transition"
          >
            {loading ? "Creating..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center text-white/80 text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-300 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
