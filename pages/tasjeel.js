import AboutUsQuote from 'components/registration/AboutUsQuote'
import RegistrationForm from 'components/registration/RegistrationForm'
import styles from '../styles/tasjeel.module.css'

function tasjeel() {
   return (
      <div className={`${styles.page}`}>
         <div className={styles.right}>
            <RegistrationForm />
         </div>
         <div className={`${styles.left}`}>
            <AboutUsQuote/>
         </div>
      </div>
   )
}

export default tasjeel
