import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import FlashcardForm from '../components/FlashcardForm'
import FlashcardItem from '../components/FlashcardItem'
import Spinner from '../components/Spinner'
import {getFlashcards, reset} from '../features/flashcards/flashcardSlice'

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {flashcards, isLoading, isError, message} = useSelector((state) => state.flashcards)

    useEffect(() => {
        if(isError) {
            console.log(message);
        }

        if(!user) {
            navigate('/login')
        }

        dispatch(getFlashcards())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])
    
    if(isLoading) {
        return <Spinner />
    }

    return <>
        <section className="heading">
            <h1>Welcome {user&&user.name}</h1>
            <p>Dashboard</p>
        </section>

        <FlashcardForm />

        <section className="content">
            {flashcards.length > 0 ? (
                <div className="flashcards">
                    {flashcards.map((flashcard) => (
                        <FlashcardItem key={flashcard._id} flashcard={flashcard}/>
                    ) )}
                </div>
            ) : (<h3>You have not entered any flashcards</h3>)}
        </section>
    </>
}

export default Dashboard