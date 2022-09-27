import Button from '@mui/material/Button'
import { AiOutlineFileDone } from 'react-icons/ai'
import { GrLinkNext } from 'react-icons/gr'
import styles from 'styles/practice.module.css'
import Link from 'next/link'

function FinishedQuiz({ reviewedWords }) {
    return (
        <div className={`${styles.finishedQuizContainer} ccter`}>
            <AiOutlineFileDone className={styles.icon}/>
            <div>
                <h2>You've Reviewed {reviewedWords} Words!</h2>
            </div>
            <div>
                <Link href="/vocabulary">
                    <Button variant="outlined" color="primary" >
                        Continue <GrLinkNext />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz
