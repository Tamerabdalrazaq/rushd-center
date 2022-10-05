import styles from 'styles/confirmaction.module.css'
import Button from './Button'
function ConfirmAction({ actions: { msg, action, setConfirmAction } }) {
   return (
      <>
         <div className={styles.container}>
            <div className={styles.msg}>
               <h3>Are You Sure You Want to {msg}?</h3>
            </div>
            <div className={styles.actions}>
               <Button
                  text="CANCEL"
                  type="reddish"
                  onClick={() => {
                     setConfirmAction(false)
                  }}
               />
               <Button
                  text="CONFIRM"
                  type="primary"
                  onClick={() => {
                     action()
                     setConfirmAction(false)
                  }}
               />
            </div>
         </div>
         <div className={styles.shader_div}></div>
      </>
   )
}

export default ConfirmAction
