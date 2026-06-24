import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job, onEdit, onDelete, isAdminView = false }) => {
  const { _id, title, type, location, description, skills, isActive } = job;

  // Safeguard skills array
  const skillsList = Array.isArray(skills)
    ? skills
    : typeof skills === "string"
    ? skills.split(",").map((s) => s.trim())
    : [];

  return (
    <div className={`job-card ${!isActive ? "job-card-inactive" : ""}`}>
      <div className="job-card-header">
        <div>
          <h3 className="job-card-title">{title}</h3>
          <div className="job-card-meta">
            <span className={`job-type-tag ${type === "Internship" ? "internship" : "job"}`}>
              {type}
            </span>
            <span className="job-location">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="meta-icon">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {location}
            </span>
            {!isActive && <span className="inactive-badge">Draft</span>}
          </div>
        </div>
      </div>

      <p className="job-card-description">
        {description && description.length > 150
          ? `${description.substring(0, 150)}...`
          : description}
      </p>

      {skillsList.length > 0 && (
        <div className="job-card-skills">
          {skillsList.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="job-card-actions">
        <Link to={`/jobs/${_id}`} className="btn btn-outline btn-sm">
          View Details
        </Link>

        {isAdminView && (
          <div className="admin-actions">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onEdit(job);
                }}
                className="btn btn-secondary btn-sm"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (confirm("Are you sure you want to delete this job?")) {
                    onDelete(_id);
                  }
                }}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
