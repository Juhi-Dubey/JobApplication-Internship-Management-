import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



const Landing = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Shape your career today</span>
          <h1 className="hero-title">
            Find Your Dream <span className="highlighted-text">Job</span> & <span className="highlighted-text">Internship</span>
          </h1>
          <p className="hero-subtitle">
            Explore thousands of curated job listings, build your professional portfolio,
            and apply effortlessly. Start managing your applications all in one premium portal.
          </p>
          <div className="hero-buttons">
            <Link to="/jobs" className="btn btn-primary btn-lg">
              Browse Openings
            </Link>
            {!isAuthenticated ? (
              <Link to="/signup" className="btn btn-outline btn-lg">
                Get Started
              </Link>
            ) : (
              <Link to={user?.role === "admin" ? "/admin" : "/dashboard"} className="btn btn-outline btn-lg">
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <h3 className="stat-number">12k+</h3>
            <p className="stat-label">Active Users</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">500+</h3>
            <p className="stat-label">Jobs & Internships</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">250+</h3>
            <p className="stat-label">Partner Companies</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">95%</h3>
            <p className="stat-label">Success Rate</p>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="features-section">
        <h2 className="section-title">How CareerHub Works</h2>
        <p className="section-subtitle">Follow three easy steps to launch your next career path</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="feature-icon">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>
              {!isAuthenticated ? "1. Create an Account" : "1. Welcome Back"}
            </h3>

            <p>
              {!isAuthenticated
                ? "Sign up securely as an applicant and get personalized recommendations."
                : "Continue exploring jobs and managing your applications."}
            </p>   
        </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="feature-icon">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <h3>2. Search for Roles</h3>
            <p>Filter by jobs or internships, match your specific skill set, and select your ideal target location.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="feature-icon">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"></path>
              </svg>
            </div>
            <h3>3. Apply & Track</h3>
            <p>Provide your resume link and cover letter, submit instantly, and monitor your status in real-time.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        {!user ? (
          <>
            <h2>Ready to Take the Next Step?</h2>
            <p>
              Create an account today and connect with potential employers or list
              openings now.
            </p>

            <Link to="/signup" className="btn btn-light">
              Create Free Account
            </Link>
          </>
        ) : user.role === "admin" ? (
          <>
            <h2>Manage Your Recruitment</h2>
            <p>
              Create job postings, review applications, and manage your hiring process.
            </p>

            <Link to="/admin" className="btn btn-light">
              Go to Admin Dashboard
            </Link>
          </>
        ) : (
          <>
            <h2>Ready to Apply for Your Dream Job?</h2>
            <p>
              Explore the latest opportunities and track all your applications in one place.
            </p>

            <Link to="/jobs" className="btn btn-light">
              Explore Jobs
            </Link>
          </>
        )}
      </section>
    </div>
  );
};

export default Landing;
