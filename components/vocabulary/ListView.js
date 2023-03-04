import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "styles/components/listView.module.css";
import axios from "axios";
import { StatsContext } from "context/UserStats";
import { collectWords } from "utils/api/client_api";
import Loading from "components/global/Loading";
import Button from "components/global/Button";
import CreateNewWord from "./CreateNewWord";
import ConfirmAction from "components/global/ConfirmAction";

function ListView({ list, setListView }) {
   const statsContext = useContext(StatsContext);
   const { USER_ID } = statsContext;
   const [populatedWords, setPopulatedWords] = useState();
   const [createNewWord, setCreateNewWord] = useState(false);

   useEffect(() => {
      async function f() {
         const data = await collectWords(list.wordsList);
         setPopulatedWords(data);
      }
      f();
   }, []);
   console.log(createNewWord);
   return (
      <>
         {createNewWord ? (
            <CreateNewWord show={setCreateNewWord} list={list} />
         ) : (
            <ConfirmAction
               actions={{
                  msg: ``,
                  action: () => setCreateNewWord(true),
                  setConfirmAction: () => setListView(false),
                  auto_cancel: false,
               }}
            >
               <div className={styles.wrapper + " ccter"}>
                  <div className={styles.listInfo}>
                     <h3>{list.name}</h3>
                     <h6>{list.wordsList.length} words</h6>
                  </div>
                  <div className={styles.wordsContainer + " ccter"}>
                     {populatedWords ? (
                        populatedWords.length > 0 ? (
                           populatedWords.map((word) => <div>{word.word}</div>)
                        ) : (
                           <h3>This List is Empty</h3>
                        )
                     ) : (
                        <Loading />
                     )}
                  </div>

                  <div>
                     {/* <Button
                        text="CANCEL"
                        type="reddish"
                        onClick={() => {
                           setListView(null)
                        }}
                     />

                  <Button
                        text="Add new word"
                        type="primary"
                        onClick={() => {
                           setCreateNewWord(true)
                        }}
                     /> */}
                  </div>
               </div>
            </ConfirmAction>
         )}
      </>
   );
}

export default ListView;
