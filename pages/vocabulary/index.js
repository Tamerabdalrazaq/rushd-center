import React, { useState } from 'react'
import Link from 'next/link'
import ListRow from 'components/vocabulary/ListRow'
import ProgressBar from 'components/vocabulary/ProgressBar'
import ListsSection from 'components/vocabulary/ListsSection'
import styles from 'styles/vocabulary.module.css'
import Button from '@mui/material/Button'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import { getUserData } from 'utils/api/client_api'


function Vocabulary({ session, userLists, categorizedWords, globalLists }) {
   const [lists, setLists] = useState(userLists)
   if (!session) return 'Please Sign In..'
   return (
      <div className={styles.wrapper}>
         <main className={`${styles.main} ccter`}>
            <div className={styles.headingMain}>
               <h1>My vocabulary</h1>
            </div>
            <div className={`${styles.progress} ccter`}>
               <h3>
                  {categorizedWords.reviewed?.length +
                     categorizedWords.needReview?.length}{' '}
                  Words Learned
               </h3>
               <ProgressBar
                  reviewed={categorizedWords.reviewed?.length}
                  needReview={categorizedWords.needReview?.length}
                  remaining={categorizedWords.remaining?.length}
               />
               <div className={styles.startLearning}>
                  <Link href="/vocabulary/practice?list=1">
                     <a>
                        <Button variant="contained" color="primary">
                           Start Learning
                        </Button>
                     </a>
                  </Link>
               </div>
            </div>

            <div className={styles.myLists}>
               <div className={styles.myListsTitle}>
                  <h2>My Lists</h2>
               </div>
               {lists.length ? (
                  <div className={styles.listsContainer}>
                     {lists.map((list) => (
                        <ListRow key={list._id} list={list} setLists={setLists} />
                     ))}
                  </div>
               ) : (
                  <div className={styles.emptyList}>
                     <h3>Your List Is Empty :(</h3>
                     <Button variant="contained" color="primary">
                        Add My First List
                     </Button>
                  </div>
               )}
            </div>
         </main>
         <ListsSection lists={globalLists} updateLists={setLists} />
      </div>
   )
}

export async function getServerSideProps(context) {
   const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
   )
   if (!session) return {
    props: {
        session
    }
   }
   else {
       const data = await getUserData(session)
       const { userLists, categorizedWords, globalLists } = data
       return {
          props: {
             session,
             userLists,
             categorizedWords,
             globalLists,
          },
       }
   }
}

export default Vocabulary
