import React, { useState, useEffect } from "react";
import { getJobs, createJob, updateJob, deleteJob, getAllApplications, updateApplicationStatus } from "../services/api";
import AdminTable from "../components/AdminTable";
import JobCard from "../components/JobCard";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("jobs"); // 'jobs' or 'applications'
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  
  // Loading & Error states
  const [jobsLoading, setJobsLoading] = useState(true);
  const [appsLoading, setAppsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");
  const [appsError, setAppsError] = useState("");

  // Job form modal state
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null); // null when creating
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Job Form fields
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("Job");
  const [jobLocation, setJobLocation] = useState("");
  const [jobSkills, setJobSkills] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobIsActive, setJobIsActive] = useState(true);

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    setJobsLoading(true);
    setJobsError("");
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
      setJobsError("Failed to fetch jobs list.");
    } finally {
      setJobsLoading(false);
    }
  };

  const fetchApplications = async () => {
    setAppsLoading(true);
    setAppsError("");
    try {
      const data = await getAllApplications();
      setApplications(data);
    } catch (err) {
      console.error(err);
      setAppsError("Failed to fetch applications.");
    } finally {
      setAppsLoading(false);
    }
  };

  const handleOpenCreateForm = () => {
    setEditingJob(null);
    setJobTitle("");
    setJobType("Job");
    setJobLocation("");
    setJobSkills("");
    setJobDescription("");
    setJobIsActive(true);
    setFormError("");
    setShowJobForm(true);
  };

  const handleOpenEditForm = (job) => {
    setEditingJob(job);
    setJobTitle(job.title || "");
    setJobType(job.type || "Job");
    setJobLocation(job.location || "");
    setJobSkills(Array.isArray(job.skills) ? job.skills.join(", ") : job.skills || "");
    setJobDescription(job.description || "");
    setJobIsActive(job.isActive !== undefined ? job.isActive : true);
    setFormError("");
    setShowJobForm(true);
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    if (!jobTitle.trim() || !jobLocation.trim() || !jobDescription.trim()) {
      setFormError("Please fill in all required fields (Title, Location, Description).");
      return;
    }

    setFormLoading(true);
    setFormError("");

    // Process skills into array of trimmed strings
    const skillsArray = jobSkills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    const jobData = {
      title: jobTitle,
      type: jobType,
      location: jobLocation,
      skills: skillsArray,
      description: jobDescription,
      isActive: jobIsActive,
    };

    try {
      if (editingJob) {
        // Edit existing
        const updated = await updateJob(editingJob._id, jobData);
        setJobs(jobs.map((j) => (j._id === editingJob._id ? updated : j)));
      } else {
        // Create new
        const created = await createJob(jobData);
        setJobs([created, ...jobs]);
      }
      setShowJobForm(false);
    } catch (err) {
      console.error(err);
      setFormError(
        err.response?.data?.message ||
          "Failed to save job posting. Please try again."
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleJobDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs(jobs.filter((j) => j._id !== id));
      // Optionally refetch applications in case any are linked to the deleted job
      fetchApplications();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete job posting.");
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const updated = await updateApplicationStatus(applicationId, newStatus);
      setApplications(
        applications.map((app) =>
          app._id === applicationId ? { ...app, status: updated.status } : app
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update application status.");
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Admin header */}
      <div className="admin-header">
        <div>
          <h1>Administrative Portal</h1>
          <p>Manage job listings and view incoming candidate applications</p>
        </div>
        <div className="admin-actions-bar">
          <button onClick={handleOpenCreateForm} className="btn btn-primary">
            + Post a New Job
          </button>
        </div>
      </div>

      {/* Tab Switchers */}
      <div className="tab-menu">
        <button
          className={`tab-btn ${activeTab === "jobs" ? "active" : ""}`}
          onClick={() => setActiveTab("jobs")}
        >
          Manage Jobs ({jobs.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "applications" ? "active" : ""}`}
          onClick={() => setActiveTab("applications")}
        >
          View Applications ({applications.length})
        </button>
      </div>

      <hr className="divider" />

      {/* Tab contents */}
      <div className="tab-content">
        {activeTab === "jobs" ? (
          <div className="admin-jobs-tab">
            {jobsLoading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Retrieving postings...</p>
              </div>
            ) : jobsError ? (
              <div className="alert alert-danger">{jobsError}</div>
            ) : jobs.length === 0 ? (
              <div className="empty-state">
                <h3>No jobs posted yet</h3>
                <p>Start listing internship and job positions by clicking the button above.</p>
              </div>
            ) : (
              <div className="jobs-grid">
                {jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onEdit={handleOpenEditForm}
                    onDelete={handleJobDelete}
                    isAdminView={true}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="admin-applications-tab">
            {appsLoading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Retrieving candidates...</p>
              </div>
            ) : appsError ? (
              <div className="alert alert-danger">{appsError}</div>
            ) : (
              <AdminTable
                applications={applications}
                onStatusChange={handleStatusChange}
              />
            )}
          </div>
        )}
      </div>

      {/* Job Form Modal */}
      {showJobForm && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingJob ? "Edit Job Posting" : "Post a New Job"}</h2>
              <button
                onClick={() => setShowJobForm(false)}
                className="btn-close"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="modal-form">
              {formError && <div className="alert alert-danger">{formError}</div>}

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="title">Job Title *</label>
                  <input
                    type="text"
                    id="title"
                    className="form-input"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                    disabled={formLoading}
                  />
                </div>

                <div className="form-group width-30">
                  <label htmlFor="type">Position Type *</label>
                  <select
                    id="type"
                    className="form-input"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    required
                    disabled={formLoading}
                  >
                    <option value="Job">Job</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    className="form-input"
                    placeholder="e.g. San Francisco, CA / Remote"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    required
                    disabled={formLoading}
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="skills">Required Skills (Comma separated)</label>
                  <input
                    type="text"
                    id="skills"
                    className="form-input"
                    placeholder="React, CSS, JavaScript, Node.js"
                    value={jobSkills}
                    onChange={(e) => setJobSkills(e.target.value)}
                    disabled={formLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Job Description *</label>
                <textarea
                  id="description"
                  className="form-textarea"
                  rows="7"
                  placeholder="Provide a comprehensive job description..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                  disabled={formLoading}
                ></textarea>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={jobIsActive}
                    onChange={(e) => setJobIsActive(e.target.checked)}
                    disabled={formLoading}
                  />
                  <span>Publish immediately (Active for applications)</span>
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowJobForm(false)}
                  className="btn btn-outline"
                  disabled={formLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formLoading}
                >
                  {formLoading ? "Saving..." : editingJob ? "Save Changes" : "Post Position"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
