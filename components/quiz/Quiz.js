import { useEffect, useState, useRef } from 'react'
import QuizProgressBar from './QuizProgressBar'
import styles from 'styles/practice.module.css'
import { useRouter } from 'next/dist/client/router'
import Loading from 'components/global/Loading'
import FinishedQuiz from './FinishedQuiz'
import BackTo from './BackTo'
import { collectWords } from 'utils/api/client_api'
import { randomRange, shuffledArray } from 'utils/helpers'
import { QUESTION_REPEAT_STEP_RANGE } from 'data/settings'
import Question from 'components/quiz/Question'
import { trimWordsList } from 'utils/quiz_utils'
import { ImExit } from 'react-icons/im'
import useMediaQuery from 'utils/Custom Hooks/useMediaQuery'
import Switch from './Switch'

function Quiz({ data: { categorizedWords, categorizedLists } }) {
   const router = useRouter()
   const [loading, setLoading] = useState(true)
   const [wordsArray, setWordsArray] = useState(null)
   const [gameArray, setGameArray] = useState([])
   const [question, setQusetion] = useState(0)
   const [gridQuiz, setGridQuiz] = useState(true)
   const reviewedWords = useRef()
   const isPhoneScreen = useMediaQuery('max', 'width', 650)

   async function fetchWords(relevantWords) {
      try {
         let words = await collectWords(relevantWords)
         const filteredRelevantWords = relevantWords.filter((gameWord) =>
            words.find((foundWord) => foundWord._id === gameWord._id)
         )
         setWordsArray(words)
         setGameArray(filteredRelevantWords)
         setLoading(false)
      } catch (e) {
         console.log(e)
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
         <BackTo
            to={'vocabulary'}
            type={'component'}
            component={<ImExit className={styles.back_button} />}
         />
         {isPhoneScreen != null && (
            <Switch setGridQuiz={setGridQuiz} isPhoneScreen={isPhoneScreen} gridQuiz={gridQuiz} />
         )}
         <div className={`${styles.content} ccter`}>
            {(() => {
               if (gameArray.length && !loading) {
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
                           wordsArray={wordsArray}
                           questionNum={question}
                           userListWord={gameArray[question]}
                           next={next}
                           replicated={gameArray[question].replicated}
                           gridQuiz={gridQuiz}
                        />
                     </>
                  )
               } else
                  return loading ? (
                     <Loading />
                  ) : (
                     <FinishedQuiz reviewedWords={'All'} />
                  )
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
      return shuffledArray(relevantList)
   }

   function getGameArray(isWrong) {
      if (!isWrong) return gameArray
      const currentWord = { ...gameArray[question], replicated: true }
      const newGameArray = [...gameArray]
      const repeat_step = randomRange(...QUESTION_REPEAT_STEP_RANGE)
      const newWordIndex =
         question + repeat_step >= gameArray.length
            ? gameArray.length
            : question + repeat_step
      newGameArray.splice(newWordIndex, 0, currentWord)
      newGameArray.push(currentWord)
      return newGameArray
   }
}

export default Quiz
