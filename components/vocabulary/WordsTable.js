import Circle from "components/global/Circle";
import Loading from "components/global/Loading";
import React, { useState, useEffect, useRef } from "react";
import {
   findObjectById,
   get_circle_color,
   joinObjectFields,
   msToTime,
   sorted,
} from "utils/helpers";

function WordsTable({ wordsArray, populatedWords, loading }) {
   const tableRef = useRef();
   // useEffect(() => tableRef.current.scrollTop = tableRef.current.scrollHeight,[])
   return (
      <div id="words-table-wrapper">
         {loading ? (
            <Loading />
         ) : (
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
                        );
                        const humanDueTime = msToTime(
                           wordStatus.dueTime - Date.now()
                        );
                        return wordObject ? (
                           <tr key={index}>
                              <td>{wordObject.word}</td>
                              <td>{humanDueTime}</td>
                              <td>
                                 <div>
                                    <Circle
                                       color={`var(--circle-${get_circle_color(
                                          wordStatus.dueTime
                                       )})`}
                                    />
                                 </div>
                              </td>
                           </tr>
                        ) : null;
                     })}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
}

export default WordsTable;
