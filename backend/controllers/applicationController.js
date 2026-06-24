const Application = require("../models/Application");
const Job = require("../models/Job");

// Apply for Job
exports.applyJob = async (req, res) => {
  try {
    const {
      jobId,
      resumeLink,
      coverNote,
    } = req.body;

    const existingApplication =
      await Application.findOne({
        userId: req.user._id,
        jobId,
      });

    if (existingApplication) {
      return res.status(400).json({
        message:
          "You have already applied for this job",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const application =
      await Application.create({
        userId: req.user._id,
        jobId,
        resumeLink,
        coverNote,
      });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// User Dashboard
exports.getMyApplications = async (
  req,
  res
) => {
  try {
    const applications =
      await Application.find({
        userId: req.user._id,
      }).populate("jobId");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin Dashboard
exports.getAllApplications =
  async (req, res) => {
    try {
      const applications =
        await Application.find()
          .populate("userId", "name email")
          .populate("jobId");

      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// Update Status
exports.updateApplicationStatus =
  async (req, res) => {
    try {
      const { status } = req.body;

      const application =
        await Application.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        );

      if (!application) {
        return res.status(404).json({
          message: "Application not found",
        });
      }

      res.status(200).json(application);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };