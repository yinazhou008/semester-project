import axios from 'axios'

const API_URL = 'http://localhost:8080/api/questions'

// create new flashcard
const getQuiz = async (limit, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + `?limit=${limit}`, config)

    return response.data
}



const flashcardService = { getQuiz }

export default flashcardService