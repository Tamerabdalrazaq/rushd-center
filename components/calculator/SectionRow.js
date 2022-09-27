import React from 'react'
import MySlider from 'components/global/MySlider'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

const secsDetails = {
   quantitative: {
      numOfQuestions: 20,
      text: 'كمي',
   },
   verbal: {
      numOfQuestions: 20,
      text: 'كلامي',
   },
   english: {
      numOfQuestions: 22,
      text: 'انجليزي',
   },
}

function SectionRow({ secType, numOfSecs, updateScore, score, calculate }) {
   const maxScore = secsDetails[secType].numOfQuestions * numOfSecs
   function handleChange(v) {
      v = parseInt(v)
      if (v < 0 || v === undefined || v === '' || !Number.isInteger(v))
         return updateScore(secType, 0)
      if (v > maxScore) return updateScore(secType, maxScore)
      updateScore(secType, v)
      calculate()
   }
   return (
      <div className="section-row ccter">
         <h3>{secsDetails[secType].text}</h3>
         <div className="section-score ccter">
            <h3>{maxScore}</h3>
            <span>/</span>
            <div>
               <input
                  type="number"
                  value={score===0 ? '' : score}
                  onChange={(e) => handleChange(e.target.value)}
               />
            </div>
         </div>
         <div>
            <Slider
               value={score}
               // getAriaValueText={valuetext}
               step={1}
               min={0}
               max={maxScore}
               onChange={handleChange}
            />
         </div>
      </div>
   )
}

export default SectionRow
