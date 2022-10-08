import { useEffect, useState } from 'react'
import styles from 'styles/practice.module.css'
import Button from 'components/global/Button'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import { HiCheckCircle } from 'react-icons/hi'
import { useRef } from 'react'
import { checkTextEquality, getWordStatus } from 'utils/quiz_utils'

function TextQuestion({
   processSubmit,
   setCheated,
   word,
   answeredCorrectly,
   questionNum,
}) {
   const [input, setInput] = useState('')
   const inputRef = useRef()

   useEffect(() => {
      setInput('')
      inputRef.current.focus()
   }, [questionNum])

   return (
      <form
         className={`${styles.form} ccter`}
         onSubmit={(e) => {
            e.preventDefault()
            processSubmit(checkTextEquality(input, word.word))
         }}
      >
         <div
            className={`${styles.inputContainer} ccter ${
               styles[getWordStatus(answeredCorrectly)]
            }`}
         >
            <input
               ref={inputRef}
               placeholder={`Meaning of ${word?.meaning}`}
               className={`${styles.input}`}
               onChange={(e) => setInput(e.target.value)}
               value={input}
               autoFocus
            />
            <div
               className={`${styles.inputCheckContainer} ccter`}
               onClick={() =>
                  processSubmit(checkTextEquality(input, word.word))
               }
            >
               {getWordStatus(answeredCorrectly) === 'correct' ? (
                  <HiCheckCircle className={`${styles.check}`} />
               ) : (
                  <IoIosArrowDroprightCircle className={`${styles.check}`} />
               )}
            </div>
         </div>
         <Button
            variant="outlined"
            color="primary"
            onClick={(e) => {
               e.preventDefault()
               setInput(word.word)
               setCheated(true)
               console.log('clicked')
            }}
         >
            Remind Me &nbsp;
            <span className={styles.shrugging_span} role="img" aria-label="shrugging">
               🤷
            </span>
         </Button>
      </form>
   )
}

export default TextQuestion
