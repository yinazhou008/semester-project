import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteFlashcard } from '../features/flashcards/flashcardSlice'

function FlashcardItem({ flashcard }) {
    const dispatch = useDispatch()
    const [state, setState] = useState("")
    const handleflipped = () => {
        if (state === 'is-flipped') {
            setState('')
        } else {
            setState('is-flipped')
        }
    }
    return (
        <div className="card">
            <button onClick={()=> dispatch(deleteFlashcard(flashcard._id))} className="close">X</button>
            <div onClick={handleflipped} className={`card_inner ${state} `}>
                <div className="card_face card_face--front">
                    <div className="card_content">
                        <div className="card_header">
                            <img src="" alt="" />
                            <h2>{new Date(flashcard.createdAt).toLocaleString('en-US')}</h2>
                        </div>
                        <div className="card_body">
                            <h2>{flashcard.text}</h2>
                        </div>
                    </div>

                </div>
                <div className="card_face card_face--back">

                    <h2>{flashcard.text2}</h2>

                </div>
            </div>
        </div>

    )
}

export default FlashcardItem


    // <div className = "flashcard">
    //     <div>
    //         {new Date(flashcard.createdAt).toLocaleString('en-US')}
    //     </div>
    //     <h2>
    //         {flashcard.text}
    //     </h2>
    //     <h2>
    //         {flashcard.text2}
    //     </h2>

    //     <button onClick={()=> dispatch(deleteFlashcard(flashcard._id))} className="close">X</button>
    // </div>