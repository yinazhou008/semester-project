const express = require("express");
const {
  createAnswer,
  getAllAnswers,
} = require("../controllers/answersController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createAnswer).get(protect, getAllAnswers);

module.exports = router;
