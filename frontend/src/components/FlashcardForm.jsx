import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createFlashcard} from '../features/flashcards/flashcardSlice'

function FlashcardForm() {
    const [text, setText] = useState('')
    const [text2, setText2] = useState('')
    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createFlashcard({text, text2}))
        setText('')
        setText2('')
    }
    
    return ( 
        <section className = 'form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Term</label>
                    <input type="text" name='text' id='text' value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="text2">Definition</label>
                    <input type="text" name='text2' id='text2' value={text2} onChange={(e) => setText2(e.target.value)} />
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