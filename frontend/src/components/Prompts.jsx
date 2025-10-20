import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trash2, Edit3 } from "lucide-react";

function Prompts() {
  const [prompts, setPrompts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    visibility: "private",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = "https://vaultiq-37wz.onrender.com/api/prompts";

  // ✅ Fetch prompts from backend (cookie-based auth)
  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, { withCredentials: true });
      setPrompts(res.data);
    } catch (err) {
      console.error("Error fetching prompts:", err);
      alert("Session expired or unauthorized. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  // ✅ Add or update prompt
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.title || !form.content) return alert("Title & Content are required!");

  try {
    // ✅ Prepare payload correctly
    const payload = {
      title: form.title,
      content: form.content,
      category: form.category?.trim() || null, // agar blank ho to null
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
        : [], // blank ho to empty array
      visibility: form.visibility,
    };

    if (editingId) {
      await axios.put(`${API}/${editingId}`, payload, { withCredentials: true });
    } else {
      await axios.post(API, payload, { withCredentials: true });
    }

    setForm({ title: "", content: "", category: "", tags: "", visibility: "private" });
    setEditingId(null);
    fetchPrompts();
  } catch (err) {
    console.error("Error saving prompt:", err);
    alert("Unable to save prompt. Please check console.");
  }
};


  // ✅ Edit
  const handleEdit = (p) => {
    setForm({
      title: p.title,
      content: p.content,
      category: p.category,
      tags: p.tags.join(","),
      visibility: p.visibility,
    });
    setEditingId(p._id);
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API}/${id}`, { withCredentials: true });
      fetchPrompts();
    } catch (err) {
      console.error("Error deleting prompt:", err);
      alert("Unable to delete. Check console.");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 text-white bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e]">
      <motion.h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
        Manage Your Prompts
      </motion.h1>

      {/* FORM */}
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-[#151520] p-5 rounded-2xl shadow-lg border border-gray-800 mb-10 space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-[#0d0d17] border border-gray-700 focus:border-purple-500 outline-none"
        />
        <textarea
          placeholder="Prompt Content"
          rows="3"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-[#0d0d17] border border-gray-700 focus:border-purple-500 outline-none resize-none"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-[#0d0d17] border border-gray-700 focus:border-purple-500 outline-none"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-[#0d0d17] border border-gray-700 focus:border-purple-500 outline-none"
        />
        <select
          value={form.visibility}
          onChange={(e) => setForm({ ...form, visibility: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-[#0d0d17] border border-gray-700 focus:border-purple-500 outline-none"
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold shadow-md"
        >
          {editingId ? "Update Prompt" : "Add Prompt"}
        </button>
      </motion.form>

      {/* PROMPTS LIST */}
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {prompts.map((p, i) => (
            <motion.div
              key={p._id}
              className="p-5 bg-[#151520] border border-gray-800 rounded-2xl shadow-md hover:border-purple-500 hover:shadow-purple-500/10 transition-all"
            >
              <h3 className="text-lg font-semibold text-purple-400 mb-2">{p.title}</h3>
              <p className="text-gray-300 text-sm mb-3">{p.content}</p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                {p.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-[#0d0d17] rounded-full border border-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-500"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex items-center gap-1 text-red-400 hover:text-red-500"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Prompts;
