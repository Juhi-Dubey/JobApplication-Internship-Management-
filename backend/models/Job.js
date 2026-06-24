const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    skills: [String],

    type: {
      type: String,
      enum: ["Internship", "Job"],
    },

    location: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);