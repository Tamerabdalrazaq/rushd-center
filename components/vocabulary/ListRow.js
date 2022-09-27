import Button from '@mui/material/Button'
import Link from 'next/link'
import { StatsContext } from 'context/UserStats'
import axios from 'axios'
import styles from 'styles/vocabulary.module.css'
import { useContext } from 'react'
import {RiFileListFill} from 'react-icons/ri'

function ListRow({ list, setLists }) {
   const statsContext = useContext(StatsContext)
   const { USER_ID } = statsContext

    async function unsubscribe() {
        try{
            const res = await axios.delete(`api/users/subscriptions/${USER_ID}`, {
                data: {
                    userListId: list._id
                }
            });
            setLists(res.data.subscribed_lists)
        } catch(e) {
            alert('An Error Has Occured.')
            alert(e)
        }
    }

   return (
      <div className={`${styles.listRowContainer} ccter`} >
         <div className={styles.leftWrapper}>
            <div className="ccter">
               <RiFileListFill/>
            </div>
            <div className={styles.listRowName}>
               <h4>{list.name}</h4>
               <div>
                  <h6>{list.wordsList.length} Words</h6>
               </div>
            </div>
         </div>
         <div className={styles.rightWrapper}>
            <div>
               <Link href={`/vocabulary/practice?list=${list._id}`}>
                  <a>
                     <Button variant="outlined" color="primary">
                        Practice
                     </Button>
                  </a>
               </Link>
            </div>
            <div>
               <Button variant="outlined" color="secondary" onClick={unsubscribe}>Unsubscribe</Button>
            </div>
         </div>
      </div>
   )
}

export default ListRow
