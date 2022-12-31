const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Please add a question"],
    },
    answers: {
      type: [String],
      required: [true, "Please add all possible answers"],
    },
    score: {
      type: Number,
      default: 10,
    },
    correctAnswer: {
      type: String,
      required: [true, "Please add a correct answer"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
