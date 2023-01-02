const express = require("express");
const { getAllQuestions } = require("../controllers/flashcardController");
const {
  createQuestion,
  // getAllQuestions,
} = require("../controllers/questionController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(createQuestion).get(protect, getAllQuestions);

module.exports = router;
