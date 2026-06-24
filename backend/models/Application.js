const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },

    resumeLink: String,

    coverNote: String,

    status: {
      type: String,
      enum: [
        "Applied",
        "Shortlisted",
        "Selected",
        "Rejected",
      ],
      default: "Applied",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);