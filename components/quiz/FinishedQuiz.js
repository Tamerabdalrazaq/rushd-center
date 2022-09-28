import { AiOutlineFileDone } from 'react-icons/ai'
import styles from 'styles/practice.module.css'
import BackTo from './BackTo'

function FinishedQuiz({ reviewedWords }) {
    return (
        <div className={`${styles.finishedQuizContainer} ccter`}>
            <AiOutlineFileDone className={styles.icon}/>
            <div>
                <h2>You&apos;ve Reviewed {reviewedWords} Words!</h2>
            </div>
            <div>
                <BackTo to={'vocabulary'} />
            </div>
        </div>
    )
}

export default FinishedQuiz
