import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="logo-icon"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>CareerHub</span>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/jobs" onClick={() => setIsOpen(false)}>
            Jobs
          </Link>

          {isAuthenticated ? (
            <>
              {user?.role === "admin" ? (
                <Link to="/admin" className="navbar-admin-badge" onClick={() => setIsOpen(false)}>
                  Admin Dashboard
                </Link>
              ) : (
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  My Dashboard
                </Link>
              )}
              <div className="user-profile-menu">
                <span className="user-name-display">Hi, {user?.name}</span>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="btn btn-secondary btn-sm btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-nav-buttons">
              <Link to="/login" className="btn btn-link" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
