import React, { useEffect, useState } from 'react'
import styles from '../../styles/scorestable.module.css'

function ScoresTable({data, row_sections}) {
    return (
        <div className={`${styles.wrapper} ccter`}>
            <div className={styles.table}>
                <div className={`${styles.thead} ${styles.trow}`}>
                    {row_sections.map((sec) => (
                    <div key={sec.key}
                        style={{color: sec.color, width: `${sec.width}%`}} 
                        className={styles.section}>
                            {sec.title}
                    </div>))}
                </div>
                {data.map((score, inx) => {
                    return (<div key={score._id} className={`${styles.trow} ${styles.trowdata}`}>
                        {row_sections.map((sec) =>
                        (<div key={sec.key} 
                            style={{color: sec.color, width: `${sec.width}%`}} 
                            className={styles.section}>
                                {sec.title === '' ? inx : score[sec.key]}
                        </div>))}
                    </div>)
                })}
            </div>
        </div>
    )
}

export default ScoresTable
