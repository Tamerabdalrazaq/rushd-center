import Calculator from 'components/calculator/Calculator'
import { useState } from 'react'
import Report from 'components/calculator/Report'

function calculator() {
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
        {/* <div className='calc-title'>
          <h1 className="ccter"> أهلا {session? session.user.name:''} في الحاسبة الذكيّة  <GrCalculator /> </h1>
        </div> */}
        <Calculator setBlurred={setBlurred} punch={punch} setShowReport={setShowReport} togglePuch={togglePuch}/> 
        {punch && (
          <div style={{width: '20%'}}></div>
        )}
      </div>
      {
        showReport && null
        // <Report data={showReport} hideReport={hideReport}/>
      }
    </div>
  )
}

export default calculator
