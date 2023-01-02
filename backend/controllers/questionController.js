const asyncHandler = require("express-async-handler");

const Question = require("../model/questionModel");

const createQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.create(req.body);
  return res.status(201).json({ status: "success", question });
});

// const getAllQuestions = asyncHandler(async (req, res, next) => {
//   // getting random questions
//   const total = await Question.count();
//   const limit = req.query.limit;
//   const x = Math.floor(total / limit);
//   const page = Math.floor(Math.random() * x) + 1;
//   const skip = (page - 1) * limit;

//   const questions = await Question.find().limit(limit).skip(skip);
//   return res.status(200).json({
//     status: "success",
//     results: questions.length,
//     data: { questions },
//   });
// });



module.exports = { createQuestion };
