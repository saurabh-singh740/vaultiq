import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Prompts from "./components/Prompts";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import CommunityFeed from "./components/Communityfeed";
import ExportPrompts from "./components/ExportPrompt"; // ✅ Export component

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Home route */}
        <Route path="/" element={<Home />} />

        {/* ✅ Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Community Feed */}
        <Route path="/community" element={<CommunityFeed />} />

        {/* ✅ Prompts page */}
        <Route path="/prompts" element={<Prompts />} />

        {/* ✅ Export Prompts page */}
        <Route path="/export" element={<ExportPrompts />} />

        {/* ✅ 404 fallback */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen text-gray-500 text-lg animate-pulse">
              🚫 Page Not Found  
              <p className="text-sm mt-2 text-gray-400">Go back to Home 🏠</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
