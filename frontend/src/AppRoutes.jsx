import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Prompts from './components/Prompts';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Directly render Prompts on "/" route */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Optional 404 fallback */}
        <Route
          path="*"
          element={
            <div className="text-center mt-20 text-gray-400">
              Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
