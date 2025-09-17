import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Board from "./modules/tasks/components/Board";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<Board />} />
      </Routes>
    </div>
  );
}
