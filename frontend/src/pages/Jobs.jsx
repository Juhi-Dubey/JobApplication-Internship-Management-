import React, { useState, useEffect } from "react";
import { getJobs } from "../services/api";
import JobCard from "../components/JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getJobs();
      // Only display active jobs
      setJobs(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs. Please try reloading the page.");
    } finally {
      setLoading(false);
    }
  };

  // Get unique locations from jobs list for filter dropdown
  const uniqueLocations = [
    "All",
    ...new Set(
      jobs
        .map((job) => job.location)
        .filter((loc) => loc && loc.trim() !== "")
    ),
  ];

  // Filter jobs based on search query, type, and location
  const filteredJobs = jobs.filter((job) => {
    if (!job.isActive) return false; // Show only active jobs to general public

    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(job.skills) &&
        job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (typeof job.skills === "string" &&
        job.skills.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = typeFilter === "All" || job.type === typeFilter;
    const matchesLocation = locationFilter === "All" || job.location === locationFilter;

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="jobs-page-container">
      <div className="jobs-header-section">
        <h1>Explore Opportunities</h1>
        <p>Discover roles that match your experience and match your goals</p>
      </div>

      {/* Filters bar */}
      <div className="jobs-filters-bar">
        <div className="search-input-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search title, description or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-selects-wrapper">
          <div className="filter-select-group">
            <label htmlFor="type-filter">Type</label>
            <select
              id="type-filter"
              className="form-input"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Job">Job</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="filter-select-group">
            <label htmlFor="location-filter">Location</label>
            <select
              id="location-filter"
              className="form-input"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              {uniqueLocations.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Job list rendering */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading openings...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="jobs-list-section">
          <div className="jobs-count-summary">
            Showing {filteredJobs.length} of {jobs.filter(j => j.isActive).length} active roles
          </div>

          {filteredJobs.length === 0 ? (
            <div className="no-jobs-found">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="no-jobs-icon">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m15 9-6 6M9 9l6 6"></path>
              </svg>
              <h3>No jobs match your search</h3>
              <p>Try modifying your search criteria or changing your selected filters.</p>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearchQuery("");
                  setTypeFilter("All");
                  setLocationFilter("All");
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="jobs-grid">
              {filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
