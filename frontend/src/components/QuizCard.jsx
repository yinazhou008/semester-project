import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { decrease, increase, submitAnswer } from '../features/quiz/quizSlice'

export default function QuizCard({ item, animationState, setAnimationState }) {
    const [prevData, setPrevData] = useState({})
    const dispatch = useDispatch()
    const { step, submited } = useSelector(state => state.quiz)
    const [state, setState] = useState(null)
    const [msg, setMsg] = useState(null)
    const [value, setValue] = useState("")
    const { answers, question, correctAnswer } = prevData || {}


    useEffect(() => {
        const exits = submited?.find(i => i?._id === item?._id)
        if (exits) {
            setPrevData(exits)
            if (exits.ans) {
                setMsg("Your answer is correct!")
                setState(1)
            } else {
                setMsg("Your answer is incorrect!")
                setState(0)
            }
        } else {
            setPrevData(item)
        }
    }, [item, submited])

    const handleAnswerSubmit = () => {
        if (!value.length) {
            setMsg("Please select a option")
            setState(0)
            return
        }
        if (correctAnswer === value) {
            setState(1)
            setMsg("Your answer is correct!")
            dispatch(submitAnswer({ ...prevData, ans: true, prevAns: value }))

        } else {
            setState(0)
            setMsg("Your answer is incorrect!")
            dispatch(submitAnswer({ ...prevData, ans: false, prevAns: value }))
        }
    }


    const prevButton = () => {
        dispatch(decrease())
        setAnimationState(0)
    }
    const nextButton = () => {
        dispatch(increase())
        setAnimationState(1)
    }

    const start = { translateX: "30%", scale: 1.1, perspective: 1000 }
    const end = { translateX: "-30%", scale: 1.1, perspective: 1000 }

    return (
        <AnimatePresence>
            <motion.div
                initial={animationState === 1 ? start : end}
                animate={{ translateX: "0%", rotate: 0, translateY: 0, }}
                exit={{ translateX: "30%" }}
                transition={{ duration: 1 }}
                className="mt-10 sm:mt-0 max-w-lg mx-auto">
                <form>
                    <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <fieldset>
                                <legend className="contents text-base font-medium text-gray-900">{question}</legend>
                                {state === 0 && <p className="text-sm text-red-500 mt-2">{msg}</p>}
                                {state === 1 && <p className="text-sm text-green-500 mt-2">{msg}</p>}
                                <div className="mt-4 space-y-4">
                                    {answers?.map((option) => <div key={option} className="flex items-center">
                                        <input
                                            id={option}
                                            name="options"
                                            type="radio"
                                            value={option}
                                            defaultValue={prevData?.prevAns === option}
                                            defaultChecked={prevData?.prevAns === option}
                                            // checked={prevData?.prevAns === option}
                                            onChange={() => setValue(option)}
                                            // checked={prevData?.prevAns === option}
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor={option} className="ml-3 block text-sm font-medium text-gray-700">
                                            {option}
                                        </label>
                                    </div>)}
                                </div>
                            </fieldset>
                        </div>
                        <div className="flex justify-end items-center gap-6 px-4 py-3 text-right sm:px-6">
                            <button
                                disabled={step === 0}
                                onClick={prevButton}
                                type="button"
                                className="w-1/2 justify-center rounded-md border  py-2 px-4 text-sm font-medium shadow-sm hover:bg-gray-100 focus:outline-none prev"
                            >
                                Previous
                            </button>
                            {state === null && <button
                                type="button"
                                onClick={handleAnswerSubmit}
                                className="w-1/2 justify-center rounded-md border py-2 px-4 text-sm font-medium  shadow-sm hover:bg-gray-100 focus:outline-none"
                            >
                                Submit
                            </button>}
                            {(state === 1 || state === 0) && <button
                                onClick={nextButton}
                                type="button"
                                className="w-1/2 justify-center rounded-md border py-2 px-4 text-sm font-medium  shadow-sm hover:bg-gray-100 focus:outline-none next"
                            >
                                Next
                            </button>}
                        </div>
                    </div>
                </form>

            </motion.div>
        </AnimatePresence>
    )
}
