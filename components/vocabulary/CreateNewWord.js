import ConfirmAction from "components/global/ConfirmAction";
import UserInput from "components/registration/UserInput";
import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "styles/components/listView.module.css";
import axios from "axios";
import { StatsContext } from "context/UserStats";
import { create_new_word } from "utils/api/client_api";

function CreateNewWord({ show, list }) {
   const [word, setWord] = useState();
   const [meaning, setMeaning] = useState();
   const [definitoin, setDefintion] = useState();
   const [example, setExample] = useState();
   const statsContext = useContext(StatsContext);
   const { USER_ID } = statsContext;
   console.log(list);
   return (
      <ConfirmAction
         actions={{
            msg: "Create New Word",
            action: () => createNewWord(),
            setConfirmAction: show,
         }}
         custom_styles={{
            container: styles.new_word_container,
         }}
      >
         <div className={styles.word_meaning}>
            <UserInput value={word} placeholder="Word" onChange={setWord} />
            <UserInput
               value={meaning}
               placeholder="Word Meaning"
               onChange={setMeaning}
            />
         </div>
         <div className={styles.definiton_example}>
            <UserInput
               value={definitoin}
               placeholder="Word Definition"
               onChange={setDefintion}
            />
            <UserInput
               value={example}
               placeholder="Word Example"
               onChange={setExample}
            />
         </div>
      </ConfirmAction>
   );

   async function createNewWord() {
      try {
         await create_new_word(
            list.originalList,
            {
               word,
               meaning,
               definitions: ["", definitoin],
               examples: ["", example],
            },
            list._id,
            true
         );
      } catch (e) {
         alert("An error has occured");
         console.log(e);
      }
   }
}

export default CreateNewWord;
