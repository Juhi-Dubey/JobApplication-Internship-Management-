import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content-area">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />

            {/* Applicant Protected Route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback Catch-All Route */}
            <Route path="*" element={<Landing />} />
          </Routes>
        </main>
        <footer className="footer-area">
          <div className="footer-container">
            <p>&copy; {new Date().getFullYear()} CareerHub. All rights reserved.</p>
            <p className="footer-meta">Built with React, Express, Mongoose, and plain CSS.</p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
