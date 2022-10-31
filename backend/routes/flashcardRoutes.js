const express = require('express')
const router = express.Router()
const {getFlashcards, setFlashcard, updateFlashcard, deleteFlashcard} = require('../controllers/flashcardController')

router.route('/').get(getFlashcards).post(setFlashcard)
router.route('/:id').delete(deleteFlashcard).put(updateFlashcard)

module.exports = router