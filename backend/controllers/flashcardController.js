const asyncHandler = require('express-async-handler')

const Flashcard = require('../model/flashcardModel')
const User = require('../model/userModel')

// @desc Get flashcards
// @route GET /api/flashcards
// @access Private
const getFlashcards = asyncHandler(async (req, res) => {
    const flashcards = await Flashcard.find({ user: req.user.id })

    res.status(200).json(flashcards)
})

// @desc Set flashcard
// @route POST /api/flashcards
// @access Private
const setFlashcard = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    if (!req.body.text2) {
        res.status(400)
        throw new Error('Please add a text2 field')
    }

    const flashcard = await Flashcard.create({
        text: req.body.text.trimStart().trimEnd(),
        text2: req.body.text2.trimStart().trimEnd(),
        user: req.user.id,
    })

    res.status(200).json(flashcard)
})

// @desc Update flashcard
// @route PUT /api/flashcards/:id
// @access Private
const updateFlashcard = asyncHandler(async (req, res) => {
    const flashcard = await Flashcard.findById(req.params.id)

    if (!flashcard) {
        res.status(400)
        throw new Error('Flashcard not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the flashcard user
    if (flashcard.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedFlashcard = await Flashcard.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedFlashcard)
})

// @desc Delete flashcard
// @route DELETE /api/flashcards/:id
// @access Private
const deleteFlashcard = asyncHandler(async (req, res) => {
    const flashcard = await Flashcard.findById(req.params.id)

    if (!flashcard) {
        res.status(400)
        throw new Error('Flashcard not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the flashcard user
    if (flashcard.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await flashcard.remove()

    res.status(200).json({ id: req.params.id })
})


const getAllQuestions = asyncHandler(async (req, res) => {

    const flashcards = await Flashcard.find({ user: req.user.id })
    // getting random questions
    const total = flashcards.length;
    const limit = req.query.limit;
    const x = Math.floor(total / limit);
    const page = Math.floor(Math.random() * x) + 1;
    const skip = (page - 1) * limit;

    const questions = await Flashcard.find({ user: req.user.id }).limit(limit).skip(skip);

 
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    // usage example:
    var a = questions?.map((i) => i.text2);
    var unique = a.filter(onlyUnique);
    

    const data = questions?.map((item, id) => {
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        const rndInt = randomIntFromInterval(1, 4)
        const un = unique.filter(i => i != item.text2)
        un[rndInt] = item.text2

        return {
            _id: id,
            question: item.text,
            correctAnswer: item.text2,
            answers: un
        }
    })

    return res.status(200).json({
        status: "success",
        results: questions.length,
        data,
    });
});


module.exports = {
    getFlashcards,
    setFlashcard,
    updateFlashcard,
    deleteFlashcard,
    getAllQuestions
}