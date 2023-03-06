import ConfirmAction from "components/global/ConfirmAction";
import UserInput from "components/registration/UserInput";
import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "styles/components/newList.module.css";
import axios from "axios";
import { StatsContext } from "context/UserStats";
import { subscribe_user } from "utils/api/client_api";

function NewList({ show }) {
   const [name, setName] = useState();
   const [description, setDescription] = useState();
   const statsContext = useContext(StatsContext);
   const { USER_ID } = statsContext;

   return (
      <div className={styles}>
         <ConfirmAction
            actions={{
               msg: "Create New List",
               action: () => createNewList(),
               setConfirmAction: show,
            }}
         >
            <UserInput
               value={name}
               placeholder="List Name"
               onChange={setName}
            />
            <UserInput
               value={description}
               placeholder="List Description"
               onChange={setDescription}
            />
         </ConfirmAction>
      </div>
   );

   async function createNewList() {
      try {
         const res_create = await axios.post(`/api/lists`, {
            name,
            parent: description,
            custom: true,
         });
         console.log(res_create);
         const res_subscribe = await subscribe_user(
            USER_ID,
            res_create.data.res._id,
            true
         );
      } catch (e) {
         alert("An error has occured");
         console.log(e);
      }
   }
}

export default NewList;
