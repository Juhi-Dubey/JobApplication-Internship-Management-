import React from "react";

const StatusBadge = ({ status }) => {
  const getStatusClass = (statusStr) => {
    switch (statusStr) {
      case "Applied":
        return "badge-applied";
      case "Shortlisted":
        return "badge-shortlisted";
      case "Selected":
        return "badge-selected";
      case "Rejected":
        return "badge-rejected";
      default:
        return "badge-default";
    }
  };

  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
