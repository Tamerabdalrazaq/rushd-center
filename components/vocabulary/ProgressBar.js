import React, { useState } from 'react'
import WordCategory from './WordCategory'
import styles from '../../styles/progressBar.module.css'

function ProgressBar({ reviewed, needReview, remaining }) {
    const sum = (reviewed + needReview + remaining)

    return (
        <div className={`${styles.progressBarWrapper} ccter`}>
            <div className={styles.progressBar}>
                <div className={styles.reviewed} style={{width: `${(reviewed/sum*100 || '0')}%`}}></div>
                <div className={styles.needReview} style={{width: `${(needReview/sum*100) || '0'}%`}}></div>
                <div className={styles.remaining} style={{width: `${(remaining/sum*100) || '0'}%`}}></div>
            </div>
            <div className={`${styles.categories} ccter`}>
                <WordCategory text="reviewed" color="#20C84F" value={reviewed}/>
                <WordCategory text="need review" color="#88FF9B" value={needReview}/>
                <WordCategory text="remaining" color="#D0D0D0" value={remaining}/>
            </div>
        </div>
    )
}

export default ProgressBar
