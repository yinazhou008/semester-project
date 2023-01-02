/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import QuizCard from '../components/QuizCard';
import QuizResult from '../components/QuizResult';
import Spinner from '../components/Spinner';
import { getQuizs } from '../features/quiz/quizSlice';

export default function Quiz() {
  const { quizs, isLoading, isError, message, step } = useSelector((state) => state.quiz)
  const [animationState, setAnimationState] = useState(0)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getQuizs(5))
  }, [])

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      {quizs?.data?.length > 0 ? (quizs?.data?.map((item, id) => step === id && <QuizCard item={item} id={id} results={quizs?.results} animationState={animationState} setAnimationState={setAnimationState} />)) : (<h3>You have not entered any flashcards</h3>)}
      {step === quizs?.results && <QuizResult />}
    </>
  )
}
