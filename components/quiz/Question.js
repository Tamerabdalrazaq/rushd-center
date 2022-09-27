import { useEffect, useState } from 'react'
import styles from 'styles/practice.module.css'
import Button from '@mui/material/Button'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import { HiCheckCircle } from 'react-icons/hi'
import axios from 'axios'
import WordDescribtion from './WordDescribtion'
import useFocus from '../../utils/features/useFocus'
import { useRef } from 'react'

function Question({
   word,
   questionNum,
   next,
   userListWord: { parentId, phase },
}) {
   const inputRef = useRef();
   const [input, setInput] = useState('')
   const [cheated, setCheated] = useState(false)
   const [answeredCorrectly, setAnsweredCorrectly] = useState(null)
   const [freeze, setFreeze] = useState(false)

   useEffect(() => {
      setAnsweredCorrectly(null)
      setInput('')
      setCheated(false)
      setFreeze(false)
      inputRef.current.focus()
   }, [questionNum])

   async function validateSubmit() {
      if (freeze) return
      if (checkEquality(input, word.word)) {
         setAnsweredCorrectly(true)
         setFreeze(true)
         setTimeout(() => next(cheated), 1000)
         const nextPhase = cheated ? 0 : phase + 1
         const dueTime = getDueTime(nextPhase)
         updateWordStatus(parentId, word._id, dueTime, nextPhase)
      } else {
         const dueTime = getDueTime(0)
         setAnsweredCorrectly(false)
         setCheated(true)
         updateWordStatus(parentId, word._id, dueTime, 0)
      }
   }

   return (
      <div className={`${styles.questionBody} ccter`}>
         <div className={styles.word_wrapper}>
            <h2 className={`${styles.questionHeading}`}>{word?.meaning}</h2>
         </div>
         <form
            className={`${styles.form} ccter`}
            onSubmit={(e) => {
               e.preventDefault()
               validateSubmit()
            }}
         >
            <div
               className={`${styles.inputContainer} ccter ${
                  styles[getWordStatus(answeredCorrectly)]
               }`}
            >
               <input
                  ref={inputRef}
                  placeholder={`Meaning of ${word.meaning}`}
                  className={`${styles.input}`}
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  autoFocus
               />
               <div
                  className={`${styles.inputCheckContainer} ccter`}
                  onClick={validateSubmit}
               >
                  {(() => {
                     switch (getWordStatus(answeredCorrectly)) {
                        case 'correct':
                           return (
                              <HiCheckCircle className={`${styles.check}`} />
                           )
                        // case('incorrect'):
                        //    return <TiDelete className={`${styles.check}`} />
                        default:
                           return (
                              <IoIosArrowDroprightCircle
                                 className={`${styles.check}`}
                              />
                           )
                     }
                  })()}
               </div>
            </div>
            <Button
               variant="outlined"
               color="primary"
               onClick={() => {
                  setInput(word.word)
                  setCheated(true)
               }}
            >
               Remind Me &nbsp;
               <span role="img" aria-label="shrugging">
                  {' '}
                  🤷
               </span>
            </Button>
         </form>
         <WordDescribtion word={word} visible={cheated} />
      </div>
   )
}

function getWordStatus(answeredCorrectly) {
   if (answeredCorrectly === null) return ''
   if (answeredCorrectly === true) return 'correct'
   if (answeredCorrectly === false) return 'incorrect'
}

function checkEquality(input, word) {
   input = input.trim().toLowerCase()
   word = word.trim().toLowerCase()
   return input === word
}

async function updateWordStatus(pId, wId, dueTime, phase) {
   const data = await axios.patch('/api/userlists/wordstatus', {
      userListId: pId,
      wordId: wId,
      updates: {
         dueTime,
         phase,
      },
   })
   return data
}

function getDueTime(phase) {
   // const DAY_MS = 24 * 60 * 60 * 1000
   const MINUTE = 1000 * 60
   switch (phase) {
      case 0:
         return Date.now() + MINUTE * 3
      case 1:
         return Date.now() + MINUTE * 10
      case 2:
         return Date.now() + MINUTE * 20
      case 3:
         return Date.now() + MINUTE * 40
      default:
         return Date.now() + MINUTE * 80
   }
}

export default Question
