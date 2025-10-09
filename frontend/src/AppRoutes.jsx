import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Prompts from "./components/Prompts";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import CommunityFeed from "./components/Communityfeed";// ✅ Correct path & case-sensitive

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Home route */}
        <Route path="/" element={<Home />} />

        {/* ✅ Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Community Feed route */}
        <Route path="/community" element={<CommunityFeed />} />

        {/* ✅ Prompts route (optional, if you want to use it) */}
        <Route path="/prompts" element={<Prompts />} />

        {/* ✅ 404 fallback */}
        <Route
          path="*"
          element={
            <div className="text-center mt-20 text-gray-400 text-lg">
              🚫 Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
