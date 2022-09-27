import React, { useContext } from 'react'
import styles from '../styles/myscores.module.css'
import ScoresTable from '../components/scores/ScoresTable'
import { StatsContext } from 'context/UserStats'
import structures from '../data/table'


function myscores() {
    const { scoresList } = useContext(StatsContext)
    return (
        <div className={`${styles.page}`}>
            <div className={styles.scoresTitle}>
                <h2 className={styles.title}>علاماتي</h2>
            </div>
            <ScoresTable data={scoresList} row_sections={structures.scores_structure}/>
        </div>
    )
}

export default myscores
