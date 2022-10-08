import { useEffect, useState } from 'react'
import styles from 'styles/practice.module.css'
import Button from 'components/global/Button'
import { create_answers } from 'utils/quiz_utils'

const NUM_OF_ANSWERS = 4

function GridQuestion({
   processSubmit,
   setCheated,
   word,
   questionNum,
   wordsArray,
}) {
   const [input, setInput] = useState(null)
   const [answerOptions, setAnswerOptions] = useState([])
   const [correctAnswer, setCorrectAnswer] = useState(null)
   useEffect(() => {
      setInput(null)
      const [answers, correct_index] = create_answers(
         word,
         wordsArray,
         NUM_OF_ANSWERS
      )
      setAnswerOptions(answers)
      setCorrectAnswer(correct_index)
   }, [questionNum])

   return (
      <div className={styles.gridQuestion_container + ' ccter-col'}>
         <div className={styles.answersGrid}>
            {answerOptions.map((option, index) => (
               <div
                  key={index}
                  className={
                     styles.answer_option +
                     ' ccter _global_button ' +
                     `${styles[
                        input != null
                           ? index === correctAnswer
                              ? 'correct'
                              : index === input
                              ? 'incorrect'
                              : ''
                           : '']
                     }`
                  }
                  onClick={() => {
                     processSubmit(index === correctAnswer)
                     setInput(index)
                  }}
               >
                  {option}
               </div>
            ))}
         </div>
         <Button
            variant="outlined"
            color="primary"
            onClick={() => {
               setCheated(true)
               setInput(-1)
            }}
         >
            Remind Me &nbsp;
            <span className={styles.shrugging_span} role="img" aria-label="shrugging">
               🤷
            </span>
         </Button>
      </div>
   )
}

export default GridQuestion
