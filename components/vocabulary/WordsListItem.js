import Button from '@mui/material/Button'
import axios from 'axios'
import { useState, useContext } from 'react'
import { StatsContext } from 'context/UserStats'
import styles from 'styles/listsection.module.css'

function WordsListItem({ list, updateLists }) {
   const [hovered, setHovered] = useState(false)
   const statsContext = useContext(StatsContext)
   const { USER_ID } = statsContext
   
   async function subscribeUser() {
        try{
            const res = await axios.post('/api/users/subscriptions', {
                userId: USER_ID,
                listId: list._id,
            })
            updateLists(res.data.subscribed_lists)
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
                     <Button variant="contained" color="secondary" onClick={subscribeUser}>
                        Subscribe to this list!
                     </Button>
                  </div>
               )
            })()}
         </div>
      </div>
   )
}

export default WordsListItem
