import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyApplications } from "../services/api";
import StatusBadge from "../components/StatusBadge";

const UserDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMyApplications();
      setApplications(data);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve your application history.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="dashboard-container">
      {/* Profile Overview Banner */}
      <div className="profile-banner">
        <div className="profile-info-block">
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h1 className="profile-name">{user?.name}</h1>
            <p className="profile-email">{user?.email}</p>
            <span className="user-role-badge">Applicant Account</span>
          </div>
        </div>
      </div>

      <div className="dashboard-main-content">
        <div className="dashboard-section-header">
          <h2>Application History</h2>
          <span className="applications-count">
            {applications.length} submitted
          </span>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading application logs...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : applications.length === 0 ? (
          <div className="empty-dashboard-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="empty-state-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <path d="M14 2v6h6"></path>
              <path d="M16 13H8M16 17H8"></path>
            </svg>
            <h3>No applications yet</h3>
            <p>You haven't applied for any jobs or internships yet. Kickstart your search now!</p>
            <Link to="/jobs" className="btn btn-primary">
              Explore Available Roles
            </Link>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map((app) => (
              <div key={app._id} className="user-application-card">
                <div className="app-card-header">
                  <div>
                    <h3 className="app-job-title">
                      {app.jobId ? (
                        <Link to={`/jobs/${app.jobId._id}`} className="job-link">
                          {app.jobId.title}
                        </Link>
                      ) : (
                        <span className="inactive-text">Deleted Job Role</span>
                      )}
                    </h3>
                    <div className="app-job-meta">
                      {app.jobId?.type && (
                        <span className={`job-type-tag ${app.jobId.type === "Internship" ? "internship" : "job"}`}>
                          {app.jobId.type}
                        </span>
                      )}
                      {app.jobId?.location && (
                        <span className="job-location">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="meta-icon">
                            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {app.jobId.location}
                        </span>
                      )}
                      <span className="app-date">Applied on {formatDate(app.appliedAt)}</span>
                    </div>
                  </div>
                  <div className="app-status-wrapper">
                    <StatusBadge status={app.status} />
                  </div>
                </div>

                <div className="app-card-details">
                  <div className="app-detail-item">
                    <strong>Resume Link:</strong>{" "}
                    {app.resumeLink ? (
                      <a href={app.resumeLink} target="_blank" rel="noopener noreferrer" className="resume-url-link">
                        View submitted resume &rarr;
                      </a>
                    ) : (
                      <span className="text-muted">None Provided</span>
                    )}
                  </div>
                  <div className="app-detail-item">
                    <strong>Cover Note:</strong>
                    <p className="app-cover-note">{app.coverNote || "No cover note was provided."}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
