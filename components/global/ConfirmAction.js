import styles from "styles/confirmaction.module.css";
import Button from "./Button";
function ConfirmAction({
   type,
   custom_styles,
   actions: { msg, action, setConfirmAction, auto_cancel = true },
   settings = {},
   children,
}) {
   return (
      <>
         <div
            className={concat_style(
               custom_styles,
               styles.container,
               "container"
            )}
         >
            <div className={styles.msg}>
               <h3>
                  {messages[type]} {msg}
               </h3>
            </div>

            {children}

            <div className={styles.actions}>
               {!settings.hide_cancel && (
                  <Button
                     text={
                        settings.cancel_text ? settings.cancel_text : "CANCEL"
                     }
                     type="reddish"
                     onClick={() => {
                        setConfirmAction(false);
                     }}
                  />
               )}

               {!settings.hide_confirm && (
                  <Button
                     text={
                        settings.confirm_text
                           ? settings.confirm_text
                           : "CONFIRM"
                     }
                     type="primary"
                     onClick={() => {
                        action();
                        auto_cancel && setConfirmAction(false);
                     }}
                  />
               )}
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

function concat_style(custom_styles, style, conc) {
   return style.concat(
      custom_styles && custom_styles[conc] ? " " + custom_styles[conc] : ""
   );
}

export default ConfirmAction;
