import {useDispatch} from 'react-redux'
import {deleteFlashcard} from '../features/flashcards/flashcardSlice'

function FlashcardItem({flashcard}) {
    const dispatch = useDispatch()

    return (
        <div className = "flashcard">
            <div>
                {new Date(flashcard.createdAt).toLocaleString('en-US')}
            </div>
            <h2>
                {flashcard.text}
            </h2>
            <button onClick={()=> dispatch(deleteFlashcard(flashcard._id))} className="close">X</button>
        </div>
    )
}

export default FlashcardItem