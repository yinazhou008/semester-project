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

const flashcardService = {
    createFlashcard,
}

export default flashcardService