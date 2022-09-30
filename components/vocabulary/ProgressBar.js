import React, { useState } from 'react'
import WordCategory from './WordCategory'
import styles from '../../styles/progressBar.module.css'

function ProgressBar({ reviewed, needReview, remaining, mini }) {
   const sum = reviewed + needReview + remaining

   return (
      <div className={`${styles.progressBarWrapper} ccter`}>
         {!mini && (
            <div className={styles.progressBar}>
               <div
                  className={styles.reviewed}
                  style={{ width: `${(reviewed / sum) * 100 || '0'}%` }}
               ></div>
               <div
                  className={styles.needReview}
                  style={{ width: `${(needReview / sum) * 100 || '0'}%` }}
               ></div>
               <div
                  className={styles.remaining}
                  style={{ width: `${(remaining / sum) * 100 || '0'}%` }}
               ></div>
            </div>
         )}
         <div className={`${styles.categories} ccter`}>
            <WordCategory text="reviewed" color="var(--circle-reviewed)" value={reviewed} />
            <WordCategory
               text="need review"
               color="var(--circle-needReview)"
               value={needReview}
            />
            <WordCategory text="remaining" color="var(--circle-remaining)" value={remaining} />
         </div>
      </div>
   )
}

export default ProgressBar
