import React, { useState } from "react";
import { applyJob } from "../services/api";

const ApplyForm = ({ jobId, jobTitle, onClose, onSuccess }) => {
  const [resumeLink, setResumeLink] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeLink.trim() || !coverNote.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await applyJob(jobId, resumeLink, coverNote);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to submit application. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Apply for {jobTitle}</h2>
          <button onClick={onClose} className="btn-close" aria-label="Close modal">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-group">
            <label htmlFor="resumeLink" className="form-label">
              Resume Link (Google Drive, Dropbox, etc.) *
            </label>
            <input
              type="url"
              id="resumeLink"
              className="form-input"
              placeholder="https://drive.google.com/..."
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="coverNote" className="form-label">
              Cover Note / Statement of Purpose *
            </label>
            <textarea
              id="coverNote"
              className="form-textarea"
              rows="6"
              placeholder="Why are you a good fit for this role?"
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              required
              disabled={loading}
            ></textarea>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
