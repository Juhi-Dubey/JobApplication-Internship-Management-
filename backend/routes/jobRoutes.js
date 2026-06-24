const express = require("express");

const router = express.Router();

const {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const adminMiddleware = require(
  "../middleware/adminMiddleware"
);

router.get("/", getJobs);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createJob
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateJob
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteJob
);

module.exports = router;