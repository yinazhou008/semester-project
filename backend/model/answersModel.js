const mongoose = require("mongoose");

const answerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Answer must belong to a user"],
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: [true, "Answer must belong to a question"],
    },
    score: {
      type: Number,
      required: [true, "Please add a score"],
    },
    isCorrect: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Answer", answerSchema);
