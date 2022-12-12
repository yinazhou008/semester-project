import axios from 'axios'

const API_URL = 'http://localhost:8080/api/flashcards/'

// create new flashcard
const createFlashcard = async (flashcardData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, flashcardData, config)

    return response.data
}

// get user flashcards
const getFlashcards = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// delete flashcard
const deleteFlashcard = async (flashcardId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + flashcardId, config)

    return response.data
}

const flashcardService = {
    createFlashcard,
    getFlashcards, 
    deleteFlashcard,
}

export default flashcardService