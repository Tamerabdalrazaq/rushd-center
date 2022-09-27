import { useEffect, useState, useRef } from 'react'
import QuizProgressBar from './QuizProgressBar'
import Question from 'components/quiz/Question'
import styles from 'styles/practice.module.css'
import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import Loading from 'components/global/Loading'
import FinishedQuiz from './FinishedQuiz'


const QUESTIONS_PER_ROUND = 12
const QUESTION_REPEAT_STEP = 3

function Quiz({ data: { categorizedWords, categorizedLists } }) {
   console.log(categorizedLists, categorizedWords);
   const router = useRouter()
   const [wordsArray, setWordsArray] = useState(null)
   const [gameArray, setGameArray] = useState([])
   const [question, setQusetion] = useState(0)
   const reviewedWords = useRef()

   async function fetchWords(relevantWords) {
      try{
         const wordsIds = relevantWords.map((word) => word._id)
         let words = (await axios.post('/api/words/collect', { wordsIds })).data
         const filteredRelevantWords = relevantWords.filter((gameWord) =>
            words.words.find((foundWord) => foundWord._id === gameWord._id)
         )
         setWordsArray(words.words)
         setGameArray(filteredRelevantWords)
      } catch(e) {
         alert('An Error Has Occured!')
      }
   }

   useEffect(() => {
         fetchWords(getRelevantWords())
   }, [])

   function next(cheated) {
      setGameArray(getGameArray(cheated))
      setQusetion((prev) => prev + 1)
   }

   return (
      <div className={`${styles.container}`}>
         <div className={`${styles.content} ccter`}>
            {(() => {
               if (gameArray.length && wordsArray) {
                  if (gameArray.length <= question)
                     return (
                        <FinishedQuiz reviewedWords={reviewedWords.current} />
                     )
                  return (
                     <>
                        <QuizProgressBar
                           progress={(question / gameArray.length) * 100}
                        />
                        <Question
                           word={wordsArray.find(
                              (word) => word._id === gameArray[question]._id
                           )}
                           questionNum={question}
                           userListWord={gameArray[question]}
                           next={next}
                        />
                     </>
                  )
               }

               return <Loading />
            })()}
         </div>
      </div>
   )

   function getRelevantWords() {
      const relevantListId = router.query.list
      let relevantList
      if (relevantListId === '1')
         relevantList = trimWordsList(
            categorizedWords.remaining,
            categorizedWords.needReview
         )
      else
         relevantList = trimWordsList(
            categorizedLists[relevantListId].remaining,
            categorizedLists[relevantListId].needReview
         )
      reviewedWords.current = relevantList.length
      return shuffleArray(relevantList)
   }

   function getGameArray(isWrong) {
      if (!isWrong) return gameArray
      const currentWord = gameArray[question]
      const newGameArray = [...gameArray]
      const newWordIndex =
         question + QUESTION_REPEAT_STEP >= gameArray.length
            ? gameArray.length
            : question + QUESTION_REPEAT_STEP
      newGameArray.splice(newWordIndex, 0, currentWord)
      return newGameArray
   }
}

function trimWordsList(remainingList, needReviewList) {
   let sortedNeedReview = needReviewList.sort((a, b) => a.dueTime - b.dueTime)
   let finalArray
   if (remainingList.length + needReviewList.length <= 12)
      finalArray = [...sortedNeedReview, ...remainingList]
   else {
      if (remainingList.length < 6) {
         finalArray = [
            ...remainingList,
            ...sortedNeedReview.slice(0, 12 - remainingList.length),
         ]
      } else if (sortedNeedReview.length < 6) {
         finalArray = [
            ...sortedNeedReview,
            ...remainingList.slice(0, 12 - sortedNeedReview.length),
         ]
      } else {
         finalArray = [
            ...sortedNeedReview.slice(0, 6),
            ...remainingList.slice(0, 6),
         ]
      }
   }
   return finalArray
}

function shuffleArray(array) {
   for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = array[i]
      array[i] = array[j]
      array[j] = temp
   }
   return array
}

export default Quiz