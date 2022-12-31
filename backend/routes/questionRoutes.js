const express = require("express");
const {
  createQuestion,
  getAllQuestions,
} = require("../controllers/questionController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(createQuestion).get(getAllQuestions);

module.exports = router;
