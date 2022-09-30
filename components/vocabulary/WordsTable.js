import Circle from 'components/global/Circle'
import React, { useState, useEffect, useRef } from 'react'
import {
   findObjectById,
   joinObjectFields,
   msToTime,
   sorted,
} from 'utils/helpers'

function WordsTable({ wordsArray, populatedWords }) {
   const tableRef = useRef()
   // useEffect(() => tableRef.current.scrollTop = tableRef.current.scrollHeight,[])
   return (
      <div id="words-table-wrapper">
         <div id="table-scroll" ref={tableRef}>
            <table id="table">
               <thead>
                  <tr>
                     <th>Word</th>
                     <th>Review In</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {sorted(joinObjectFields(wordsArray), (a, b) =>
                     a.dueTime > b.dueTime ? 1 : -1
                  ).map((wordStatus, index) => {
                     const wordObject = findObjectById(
                        populatedWords,
                        wordStatus._id
                     )
                     const humanDueTime = msToTime(wordStatus.dueTime - Date.now())
                     return wordObject ? (
                        <tr key={index}>
                           <td>{wordObject.word}</td>
                           <td>{humanDueTime}</td>
                           <td>
                              <div>
                              <Circle
                                 color={`var(--circle-${getColor(wordStatus.dueTime)})`}
                              />
                              </div>
                           </td>
                        </tr>
                     ) : null
                  })}
               </tbody>
            </table>
         </div>
      </div>
   )
}

function getColor(dueTime) {
   if (dueTime == -1) return 'remaining'
   const relativeDueTime = dueTime - Date.now() 
   if (relativeDueTime > 0) return 'reviewed'
   else return 'needReview'
}

export default WordsTable
