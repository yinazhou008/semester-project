const asyncHandler = require("express-async-handler");

const Answer = require("../model/answersModel");

const createAnswer = asyncHandler(async (req, res, next) => {
  const answer = await Answer.create({
    user: req.user._id,
    question: req.body.question,
    score: req.body.score,
    isCorrect: req.body.isCorrect,
  });
  return res.status(201).json({ status: "success", answer });
});

const getAllAnswers = asyncHandler(async (req, res, next) => {
  const answers = await Answer.find({ user: req.user._id });
  return res.status(200).json({ status: "success", answers });
});

module.exports = { createAnswer, getAllAnswers };
