import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { reset } from '../features/quiz/quizSlice'

export default function QuizResult() {
    const { submited } = useSelector(state => state.quiz)
    const result = submited?.filter(i => i.ans)
    const dispatch = useDispatch()
    const createNewQuiz = () => {
        dispatch(reset())
        setTimeout(() => {
            Navigate('/')
        }, 100);
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2>Your Result: {result?.length * 10}</h2>
                <p className='text-sky-500 font-medium hover:underline' onClick={createNewQuiz}>Create new Quiz</p>
            </div>
            <div className="flex flex-col gap-3">
                {
                    submited?.map(item => (
                        <div key={item._id} className={"p-5 border rounded flex justify-between"}>
                            <div className="">
                                <h4 className='font-semibold text-lg'>{item.question}</h4>

                                <p className='text-sm mt-2'>Your answer: <span className={(item.ans ? "text-green-500" : "text-red-500") + " capitalize font-semibold"}>{item?.prevAns}</span></p>
                                <p className='text-sm'>Correct answer: <span className='font-semibold text-green-500'> {item?.correctAnswer}</span></p>

                            </div>
                            <div className="flex justify-center items-center">
                                <h4>Score: <span className={(item.ans ? "text-green-500" : "text-red-500") + " capitalize font-semibold"}>{item.ans ? "10" : "0"}</span></h4>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
