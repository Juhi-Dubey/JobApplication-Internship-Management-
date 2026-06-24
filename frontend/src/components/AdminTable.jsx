import React, { useState } from "react";
import StatusBadge from "./StatusBadge";

const AdminTable = ({ applications, onStatusChange }) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusUpdate = (id, newStatus) => {
    if (onStatusChange) {
      onStatusChange(id, newStatus);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const jobTitle = app.jobId?.title?.toLowerCase() || "";
    const candidateName = app.userId?.name?.toLowerCase() || "";
    const candidateEmail = app.userId?.email?.toLowerCase() || "";
    const appStatus = app.status;

    const matchesSearch =
      jobTitle.includes(searchQuery.toLowerCase()) ||
      candidateName.includes(searchQuery.toLowerCase()) ||
      candidateEmail.includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || appStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
    <div className="admin-table-container">
      <div className="table-controls">
        <div className="search-box">
          <input
            type="text"
            className="form-input"
            placeholder="Search by job title, name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <select
            className="form-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Candidate Details</th>
              <th>Role Applied</th>
              <th>Applied On</th>
              <th>Resume</th>
              <th>Cover Note</th>
              <th>Current Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center no-data">
                  No applications found matching the search criteria.
                </td>
              </tr>
            ) : (
              filteredApplications.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div className="candidate-name">{app.userId?.name || "Unknown"}</div>
                    <div className="candidate-email">{app.userId?.email || "N/A"}</div>
                  </td>
                  <td>
                    <div className="job-title-cell">{app.jobId?.title || "Deleted Job"}</div>
                    <span className={`job-type-tag ${app.jobId?.type === "Internship" ? "internship" : "job"}`}>
                      {app.jobId?.type || "N/A"}
                    </span>
                  </td>
                  <td>{formatDate(app.appliedAt)}</td>
                  <td>
                    {app.resumeLink ? (
                      <a
                        href={app.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-link"
                      >
                        View Resume &rarr;
                      </a>
                    ) : (
                      <span className="no-resume">Not Provided</span>
                    )}
                  </td>
                  <td>
                    <div className="cover-note-cell" title={app.coverNote}>
                      {app.coverNote || "No note attached"}
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={app.status} />
                  </td>
                  <td>
                    <select
                      className="status-select-input"
                      value={app.status}
                      onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
