import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getJobs, getMyApplications } from "../services/api";
import ApplyForm from "../components/ApplyForm";
import StatusBadge from "../components/StatusBadge";

const JobDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id, isAuthenticated]);

  const fetchJobDetails = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch all jobs and find the one that matches our route parameter
      const allJobs = await getJobs();
      const foundJob = allJobs.find((j) => j._id === id);

      if (!foundJob) {
        setError("Job listing not found. It may have been removed.");
        setLoading(false);
        return;
      }

      setJob(foundJob);

      // If the user is logged in, check if they have already applied for this job
      if (isAuthenticated && user?.role !== "admin") {
        const myApps = await getMyApplications();
        const existingApp = myApps.find(
          (app) => app.jobId?._id === id || app.jobId === id
        );

        if (existingApp) {
          setHasApplied(true);
          setApplicationStatus(existingApp.status);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Error loading job details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplySuccess = () => {
    setShowApplyModal(false);
    setHasApplied(true);
    setApplicationStatus("Applied");
    alert("Application submitted successfully!");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="job-detail-error-container">
        <div className="alert alert-danger">{error || "Job not found"}</div>
        <Link to="/jobs" className="btn btn-primary mt-4">
          &larr; Back to Jobs List
        </Link>
      </div>
    );
  }

  const { title, type, location, description, skills, isActive } = job;
  const skillsList = Array.isArray(skills)
    ? skills
    : typeof skills === "string"
    ? skills.split(",").map((s) => s.trim())
    : [];

  return (
    <div className="job-detail-page-container">
      <div className="back-nav">
        <Link to="/jobs" className="back-link">
          &larr; Back to Openings
        </Link>
      </div>

      <div className="job-detail-card">
        <div className="job-detail-header">
          <div className="job-detail-title-area">
            <h1>{title}</h1>
            <div className="job-detail-meta">
              <span className={`job-type-tag ${type === "Internship" ? "internship" : "job"}`}>
                {type}
              </span>
              <span className="job-location">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="meta-icon">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {location}
              </span>
            </div>
          </div>

          <div className="job-detail-actions">
            {!isActive ? (
              <span className="badge-inactive-big">Listing Inactive</span>
            ) : user?.role === "admin" ? (
              <Link to="/admin" className="btn btn-secondary">
                Manage Jobs (Admin)
              </Link>
            ) : hasApplied ? (
              <div className="already-applied-container">
                <span className="already-applied-text">You have applied for this role</span>
                <StatusBadge status={applicationStatus} />
              </div>
            ) : isAuthenticated ? (
              <button
                onClick={() => setShowApplyModal(true)}
                className="btn btn-primary btn-lg"
              >
                Apply Now
              </button>
            ) : (
              <button
                onClick={() => navigate("/login", { state: { from: { pathname: `/jobs/${id}` } } })}
                className="btn btn-primary btn-lg"
              >
                Log In to Apply
              </button>
            )}
          </div>
        </div>

        <hr className="divider" />

        <div className="job-detail-body">
          <div className="detail-section">
            <h2>Job Description</h2>
            <p className="job-full-description">{description}</p>
          </div>

          {skillsList.length > 0 && (
            <div className="detail-section">
              <h2>Required Skills</h2>
              <div className="job-detail-skills">
                {skillsList.map((skill, index) => (
                  <span key={index} className="skill-tag skill-tag-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showApplyModal && (
        <ApplyForm
          jobId={id}
          jobTitle={title}
          onClose={() => setShowApplyModal(false)}
          onSuccess={handleApplySuccess}
        />
      )}
    </div>
  );
};

export default JobDetail;
