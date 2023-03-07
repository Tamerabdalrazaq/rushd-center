import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "styles/components/listView.module.css";
import axios from "axios";
import { StatsContext } from "context/UserStats";
import { collectWords } from "utils/api/client_api";
import Loading from "components/global/Loading";
import Button from "components/global/Button";
import CreateNewWord from "./CreateNewWord";
import ConfirmAction from "components/global/ConfirmAction";
import WordCategory from "./WordCategory";
import { get_circle_color } from "utils/helpers";
import Circle from "components/global/Circle";
import useFetch from "utils/Custom Hooks/useFetch";

function ListView({ list, setListView }) {
   const statsContext = useContext(StatsContext);
   const { USER_ID } = statsContext;
   const [populatedWords, setPopulatedWords] = useState();
   const [createNewWord, setCreateNewWord] = useState(false);
   const { data, loading, error, refetch } = useFetch(() =>
      collectWords(list.wordsList)
   );
   useEffect(() => {
      async function f() {
         const populated = list.wordsList.map((word) => {
            return {
               ...word,
               ...data.find((d) => d._id == word._id),
            };
         });
         setPopulatedWords(populated);
      }
      data && f();
   }, [data]);
   return (
      <>
         {createNewWord ? (
            <CreateNewWord show={setCreateNewWord} list={list} />
         ) : (
            <ConfirmAction
               custom_styles={{
                  container: styles.container,
               }}
               actions={{
                  msg: ``,
                  action: () => setCreateNewWord(true),
                  setConfirmAction: () => setListView(false),
                  auto_cancel: false,
               }}
               settings={{
                  hide_confirm: !list.custom,
                  confirm_text: "Add new word",
               }}
            >
               <div className={styles.wrapper + " ccter"}>
                  <div className={styles.list_info}>
                     <h3>{list.name}</h3>
                     <h6>{list.wordsList.length} words</h6>
                  </div>
                  <div className={styles.scroll}>
                     <div className={styles.wordsContainer + " ccter"}>
                        {populatedWords ? (
                           populatedWords.length > 0 ? (
                              populatedWords.map((word) => (
                                 <div key={word._id}>
                                    <Circle
                                       color={`var(--circle-${get_circle_color(
                                          word.dueTime
                                       )})`}
                                    />
                                    {word.word}
                                 </div>
                              ))
                           ) : (
                              <h3>This List is Empty</h3>
                           )
                        ) : (
                           <Loading />
                        )}
                     </div>
                  </div>
               </div>
            </ConfirmAction>
         )}
      </>
   );
}

export default ListView;
