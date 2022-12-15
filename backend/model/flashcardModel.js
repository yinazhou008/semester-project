const mongoose = require('mongoose')

const flashcardSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
    text2: {
        type: String,
        required: [true, 'Please add a text2 value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Flashcard', flashcardSchema)