import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createFlashcard} from '../features/flashcards/flashcardSlice'

function FlashcardForm() {
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createFlashcard({text}))
        setText('')
    }
    
    return ( 
        <section className = 'form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Flashcard</label>
                    <input type="text" name='text' id='text' value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    )
}

export default FlashcardForm