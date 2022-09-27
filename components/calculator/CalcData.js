import { useEffect, useState, useRef, useContext } from 'react'
import SectionRow from './SectionRow'
import { getScores } from '../../utils/helpers'
import { getDate } from '../../utils/helpers'
import Button from '@mui/material/Button'
import { VscSaveAs } from 'react-icons/vsc'
import CountUp from 'react-countup'
import { useAlert } from 'react-alert'
import { StatsContext } from 'context/UserStats'
import axios from 'axios'

const initialRowScore = {
   quantitative: 30,
   verbal: 30,
   english: 30,
}

function Calculator({ curves, numOfSecs, showReport, type }) {
   const alert = useAlert()
   const [qSecs, vSecs, eSecs] = numOfSecs.split('-')
   const [finalScores, setFinalScores] = useState()
   const [rawScore, setRawScore] = useState(initialRowScore)
   const prevScore = useRef(200)
   const { USER_ID } = useContext(StatsContext)

   useEffect(() => {
      calculateScore()
   }, [rawScore, curves])

   useEffect(() => {
      setRawScore(initialRowScore)
   }, [numOfSecs])

   function updateRawScore(section, score) {
      setRawScore((prev) => {
         let rawScore = { ...prev }
         rawScore[section] = score
         return rawScore
      })
   }

   async function calculateScore() {
      const avgRawScores = getAvgRawScore()
      if (!rawScore) return
      if (
         Object.keys(avgRawScores).find((key) => {
            return (avgRawScores[key] > (key === 'english'?44:40)
            )
         })
      )
         return
      const results = getScores(curves, avgRawScores)
      prevScore.current = finalScores?.finalScores.gFinal
      setFinalScores(results)
   }

   function getAvgRawScore() {
      return {
         quantitative: Math.round((rawScore.quantitative / qSecs) * 2),
         verbal: Math.round((rawScore.verbal / vSecs) * 2),
         english: Math.round((rawScore.english / eSecs) * 2),
      }
   }

   return (
      <div className="calculator ccter">
         <div className="exam-data ccter">
            <div className="section-row exam-data-head ccter">
               <h3>موضوع</h3>
               <h3>عدد الاسئلة</h3>
               <h3>الاجابات الصحيحة</h3>
            </div>
            <SectionRow
               score={rawScore.quantitative}
               secType="quantitative"
               numOfSecs={qSecs}
               updateScore={updateRawScore}
               calculate={calculateScore}
            />
            <SectionRow
               score={rawScore.verbal}
               secType="verbal"
               numOfSecs={vSecs}
               updateScore={updateRawScore}
               calculate={calculateScore}
            />
            <SectionRow
               score={rawScore.english}
               secType="english"
               numOfSecs={eSecs}
               updateScore={updateRawScore}
               calculate={calculateScore}
            />
         </div>
         <div className="calculate-score ccter">
            {/* <Button variant="outlined" color="secondary" onClick={calculateScore} >
                    إحسب
                </Button> */}
            <div className="final-score">
               <CountUp
                  end={finalScores?.finalScores.gFinal || 200}
                  start={prevScore.current}
                  duration={0.5}
               />
            </div>
            <div className="post-calc ccter">
               {finalScores && (
                  <>
                     <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => showReport(finalScores)}
                     >
                        لمشاهدة التقرير الكامل
                     </Button>
                     <div className="save-icon">
                        <VscSaveAs onClick={addScoreToDB} />
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   )

   async function addScoreToDB() {
      try{
         const score = {
         ...finalScores.finalScores,
         ...finalScores.sectionsScores,
         type,
         date: getDate(),
         }
         await axios.post(`/api/users/scores/${USER_ID}`, {score})
         alert.show("تمت الإضافة بنجاح!", {
            type: 'success',
         });
      } catch(e) {
         console.log(e);
         alert.show("an error occured", {
            type: 'error',
         });
      }
   }
}

export default Calculator
