import styles from 'styles/practice.module.css'

function QuizProgressBar({ progress }) {
    return (
        <div className={styles.progressBar}>
            <div style={{width: `${progress}%`}} className={styles.progress}></div>
        </div>
    ) 
}

export default QuizProgressBar
