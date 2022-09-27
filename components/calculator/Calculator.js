import { useState } from 'react'
import CalcData from './CalcData'
import Option from './Option'
import { MenuItem, NativeSelect, Select } from '@mui/material'

import {exams, compositions} from '../../data/curves'

export default function CalculatorPage({ setBlurred, setShowReport }) {
  const [examType, setExamType] = useState('nite')
  const [examComposition, setExamComposition] = useState('2-2-2')
  const [niteExam, setNiteExam] = useState(exams[0].id)

  function showReportView({ finalScores, sectionsScores }) {
    setBlurred(true);
    setShowReport({
      finalScores,
      sectionsScores,
    })
  }

  return (
    <main className="calc-main ccter" style={{direction: 'rtl'}}>
      <div className="container ccter" >
        <div className="wrapper">
          <div className="exam-options ccter">
            <div className="exam-type ccter">
              <Option text='مركز قطري' value='nite' isSelected={examType==='nite'} onClick={setExamType} />
              <Option text='امتحان خاصّ' value='custom' isSelected={examType === 'custom'} onClick={setExamType}/>
            </div>
            <div className="exam-composition ccter">
                  {
                    examType === 'nite' ? 
                    <Select value={niteExam} onChange={(e) => setNiteExam(e.target.value)}>
                          {exams.map((exam) => <MenuItem key={exam.id} value={exam.id}>{exam.arTitle}</MenuItem>)}
                    </Select> : 
                    <Select value={examComposition} onChange={(e) => setExamComposition(e.target.value)}>
                      {compositions.map((composition) => <MenuItem key={composition.id} value={composition.id}>{composition.arTitle}</MenuItem>) }
                    </Select> 
                  }
            </div>
          </div>
        </div>

        <CalcData
        curves={examType === 'nite' ? exams[getExamIndex(niteExam)].curves: exams[0].curves}
        numOfSecs={examType === 'nite' ? '2-2-2' : examComposition}
        showReport={(res) => showReportView(res)}
        type={examType==='nite' ? exams[getExamIndex(niteExam)].arTitle: '-'}
        />
      </div>
    </main>
  )
}

function getExamIndex (id) {
  return exams.findIndex((exam) => exam.id === id)
}