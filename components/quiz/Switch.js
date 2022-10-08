import { BsFillGridFill } from 'react-icons/bs'
import { MdOutlineTextsms } from 'react-icons/md'
import styles from 'styles/practice.module.css'
import ReactSwitch from 'react-switch'

function Switch({setGridQuiz, isPhoneScreen, gridQuiz}) {
  return (
    <div className={styles.switchWrapper}>
               <ReactSwitch
                  className={styles.switchWrapper}
                  onChange={() => setGridQuiz(!gridQuiz)}
                  checked={gridQuiz}
                  uncheckedIcon={
                     <MdOutlineTextsms
                        className={styles.switchIcon + ' abs_center'}
                     />
                  }
                  checkedIcon={
                     <BsFillGridFill
                        className={styles.switchIcon + ' abs_center'}
                     />
                  }
                  offColor={'#1b85e5'}
                  onColor={'#1b85e5'}
                  width={isPhoneScreen ? 90 : 90}
                  height={isPhoneScreen ? 40 : 40}
               />
            </div>
  )
}

export default Switch