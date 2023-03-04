import styles from "styles/confirmaction.module.css";
import Button from "./Button";
function ConfirmAction({
   type,
   custom_styles,
   actions: { msg, action, setConfirmAction, auto_cancel = true },
   children,
}) {
   return (
      <>
         <div className={styles.container}>
            <div className={styles.msg}>
               <h3>
                  {messages[type]} {msg}
               </h3>
            </div>

            {children}

            <div className={styles.actions}>
               <Button
                  text="CANCEL"
                  type="reddish"
                  onClick={() => {
                     setConfirmAction(false);
                  }}
               />
               <Button
                  text="CONFIRM"
                  type="primary"
                  onClick={() => {
                     action();
                     auto_cancel && setConfirmAction(false);
                  }}
               />
            </div>
         </div>
         <div className={styles.shader_div}></div>
      </>
   );
}

const messages = {
   warning: "Are you sure you want to",
   none: "",
};

export default ConfirmAction;
