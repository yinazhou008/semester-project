const express = require('express')
const router = express.Router()
const {getFlashcards, setFlashcard, updateFlashcard, deleteFlashcard} = require('../controllers/flashcardController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getFlashcards).post(protect, setFlashcard)
router.route('/:id').delete(protect, deleteFlashcard).put(protect, updateFlashcard)

module.exports = router