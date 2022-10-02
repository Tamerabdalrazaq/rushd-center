import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ListRow from 'components/vocabulary/ListRow'
import ProgressBar from 'components/vocabulary/ProgressBar'
import ListsSection from 'components/vocabulary/ListsSection'
import WordsTable from 'components/vocabulary/WordsTable'
import styles from 'styles/vocabulary.module.css'
import Button from '@mui/material/Button'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import { categorizeUserLists, collectWords, getUserData } from 'utils/api/client_api'
import { joinObjectFields, organizeListsByParent } from 'utils/helpers'
import { signIn } from 'next-auth/react'

function Vocabulary({ session, userLists, globalLists }) {
   const [populatedWords, setPopulatedWords] = useState([])
   const [lists, setLists] = useState(userLists)
   const [loading, setLoading] = useState(false)
   useEffect(() => {
      async function f() {
         setLoading(true)
         const data = await collectWords(joinObjectFields(categorizedWords))
         setPopulatedWords(data)
         setLoading(false)
      }
      session && f()
   }, [lists])
   
   if (!session) {
      signIn()
      return ''
   }
   
   const { categorizedLists, categorizedWords } = categorizeUserLists(lists)
   const organizedLists = organizeListsByParent(globalLists)

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
            <div className={styles.lists_words_section}>
               <div className={styles.myLists}>
                  <div className={styles.myListsTitle}>
                     <h2>My Lists</h2>
                  </div>
                  {lists.length ? (
                     <div className={styles.listsContainer}>
                        {lists.map((list) => (
                           <ListRow
                              key={list._id}
                              list={list}
                              setLists={setLists}
                              categorizedList={categorizedLists[list._id]}
                           />
                        ))}
                     </div>
                  ) : (
                     <div className={styles.emptyList}>
                        <h3>Your are not subscribed to any list yet :(</h3>
                        <h3>Please Add your first list ↓</h3>
                     </div>
                  )}
               </div>
               <WordsTable loading={loading} wordsArray={categorizedWords} populatedWords={populatedWords} />
            </div>
         </main>
         {Object.keys(organizedLists).map((parent) => (
            <ListsSection
               key={parent}
               name={parent}
               lists={organizedLists[parent]}
               updateLists={setLists}
               userLists={lists}
            />
         ))}
      </div>
   )
}

export async function getServerSideProps(context) {
   const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
   )
   if (!session)
      return {
         props: {
            session: false,
         },
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
