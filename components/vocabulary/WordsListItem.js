import Button from '@mui/material/Button'
import axios from 'axios'
import { useState, useContext } from 'react'
import { StatsContext } from 'context/UserStats'
import { useAlert } from 'react-alert'
import styles from 'styles/listsection.module.css'
import { subscribe_user } from 'utils/api/client_api'

function WordsListItem({ list, updateLists, userLists }) {
   const alert = useAlert()
   const [hovered, setHovered] = useState(false)
   const statsContext = useContext(StatsContext)
   const { USER_ID } = statsContext
   
   async function subscribeUser() {
        try{
         if(!userLists.find((lst) => lst.originalList === list._id)) {
            const res = await subscribe_user(USER_ID, list._id, false)
            updateLists(res.data.subscribed_lists)
            alert.show('Successfully Subscribed to '+ list.name, {type: 'success'})
         } else {
            alert.show('Your are Already Subscribed to This List', {type: 'error'})
         }
        } catch(e) {
            alert('An error has occured')
        }
    }

   return (
      <div
         className={styles.wordsListItem}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
      >
         <img src={list.imgSrc} alt={list.name} />
         <div className={styles.label}>
            {(() => {
               if (!hovered)
                  return (
                     <div className={`${styles.initial} ccter`}>
                        <h3>{list.name}</h3>
                     </div>
                  )
               return (
                  <div className={`${styles.hovered} ccter`}>
                     <h2>{list.name}</h2>
                     <h3>{list.words.length} Words</h3>
                     <button className={styles._button} variant="contained" color="secondary" onClick={subscribeUser}>
                        Subscribe to this list!
                     </button>
                  </div>
               )
            })()}
         </div>
      </div>
   )
}

export default WordsListItem
