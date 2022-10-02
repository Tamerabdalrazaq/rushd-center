import CalculatorComponent from 'components/calculator/Calculator'
import Report from 'components/calculator/Report'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

function Calculator() {
  const [blurred, setBlurred] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [punch, togglePuch] = useState(false)

  function hideReport() {
    setBlurred(false)
    setShowReport(false)
  }

  return (
    <div>
      <div className={`calc-page-wrapper ${blurred? 'blurred': ''}`}>
        <CalculatorComponent setBlurred={setBlurred} punch={punch} setShowReport={setShowReport} togglePuch={togglePuch}/> 
        {punch && (
          <div style={{width: '20%'}}></div>
        )}
      </div>
      {
        showReport && <Report data={showReport} hideReport={hideReport}/>
      }
    </div>
  )
}

export default Calculator
