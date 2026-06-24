const express = require("express");

const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const adminMiddleware = require(
  "../middleware/adminMiddleware"
);

router.post(
  "/",
  authMiddleware,
  applyJob
);

router.get(
  "/me",
  authMiddleware,
  getMyApplications
);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllApplications
);

router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateApplicationStatus
);

module.exports = router;