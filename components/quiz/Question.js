import { useEffect, useState } from "react";
import styles from "styles/practice.module.css";
import WordDescribtion from "./WordDescribtion";
import { getDueTime, updateWordStatus } from "utils/quiz_utils";
import TextQuestion from "./TextQuestion";
import Button from "../global/Button";
import GridQuestion from "./GridQuestion";

function Question({
   word,
   questionNum,
   next,
   userListWord: { parentId, phase },
   replicated,
   wordsArray,
   gridQuiz,
}) {
   const [cheated, setCheated] = useState(false);
   const [freeze, setFreeze] = useState(false);
   const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
   const [view_desc, setView_desc] = useState(false);
   useEffect(() => {
      setAnsweredCorrectly(null);
      setCheated(false);
      setFreeze(false);
      setView_desc(false);
   }, [questionNum]);

   function processSubmit(correctAnswer) {
      if (freeze) return;
      if (correctAnswer) {
         setAnsweredCorrectly(true);
         setFreeze(true);
         setTimeout(() => next(cheated), 1000);
         if (!replicated) {
            const nextPhase = cheated ? 0 : phase + 1;
            const dueTime = getDueTime(nextPhase);
            updateWordStatus(parentId, word._id, dueTime, nextPhase);
         }
      } else {
         const dueTime = getDueTime(0);
         setAnsweredCorrectly(false);
         setCheated(true);
         if (!replicated) updateWordStatus(parentId, word._id, dueTime, 0);
      }
   }

   return (
      <div className={`${styles.questionBody} ccter`}>
         <div className={styles.word_wrapper}>
            <h2 className={`${styles.questionHeading}`}>
               {word[gridQuiz ? "word" : "meaning"]}
            </h2>
         </div>
         {gridQuiz ? (
            <GridQuestion
               processSubmit={processSubmit}
               word={word}
               setCheated={setCheated}
               answeredCorrectly={answeredCorrectly}
               questionNum={questionNum}
               wordsArray={wordsArray}
            />
         ) : (
            <TextQuestion
               processSubmit={processSubmit}
               word={word}
               setCheated={setCheated}
               answeredCorrectly={answeredCorrectly}
               questionNum={questionNum}
            />
         )}
         {!cheated && !view_desc && (
            <Button
               text="View Definitions"
               type="reddish"
               onClick={() => {
                  setView_desc(true);
               }}
            />
         )}
         <WordDescribtion word={word} visible={cheated || view_desc} />

         <div style={{ height: "2rem" }}></div>
      </div>
   );
}

export default Question;
