import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ListRow from 'components/vocabulary/ListRow'
import ProgressBar from 'components/vocabulary/ProgressBar'
import ListsSection from 'components/vocabulary/ListsSection'
import WordsTable from 'components/vocabulary/WordsTable'
import NewList from 'components/vocabulary/NewList'
import styles from 'styles/vocabulary.module.css'
import Button from '@mui/material/Button'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import {
   categorizeUserLists,
   collectWords,
   getUserData,
} from 'utils/api/client_api'
import { findObjectById, joinObjectFields, organizeListsByParent } from 'utils/helpers'


function Vocabulary({ session, userLists, globalLists }) {
   const [populatedWords, setPopulatedWords] = useState([])
   const [lists, setLists] = useState(userLists)
   const [loading, setLoading] = useState(false)
   const static_data = useRef({
      categorizedLists: null,
      categorizedWords: null,
      organizedLists: null,
   })
   const [newList, setNewList] = useState(true)
   useEffect(() => {
      async function f() {
         let { categorizedLists, categorizedWords } = categorizeUserLists(lists)
         let organizedLists = organizeListsByParent(globalLists)
         static_data.current = {
            categorizedLists,
            categorizedWords,
            organizedLists,
         }
         setLoading(true)
         const data = await collectWords(joinObjectFields(categorizedWords))
         setPopulatedWords(data)
         setLoading(false)
      }
      session && f()
   }, [lists])

   const {
      categorizedLists,
      categorizedWords,
      organizedLists,
   } = static_data.current

   return (
      <div className={styles.wrapper}>
         {newList && <NewList show={setNewList}/>}
         <main className={`${styles.main} ccter`}>
            <div className={styles.headingMain}>
               <h1>My vocabulary</h1>
            </div>
            {session && static_data.current.categorizedWords ? (
               <>
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
                                    originalList={findObjectById(globalLists, list.originalList)}
                                 />
                              ))}
                           </div>
                        ) : (
                           <div className={styles.emptyList}>
                              <h3>
                                 Your are not subscribed to any list yet :(
                              </h3>
                              <h3>Please Add your first list ↓</h3>
                           </div>
                        )}
                     </div>
                     <WordsTable
                        loading={loading}
                        wordsArray={categorizedWords}
                        populatedWords={populatedWords}
                     />
                  </div>
                  <div className={styles.lists_section}>
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
               </>
            ) : (
               <div>
                  <h3>Please Sign In</h3>
               </div>
            )}
         </main>
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
