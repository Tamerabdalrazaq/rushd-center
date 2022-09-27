import { useSession } from "next-auth/react"
import React, { useState, useEffect } from 'react'

export const StatsContext = React.createContext()

export function StatsProvider({ children }) {
   const { data: session } = useSession()
   const [userLists, setUserLists] = useState([])
   const [categorizedWords, setCategorizedWords] = useState({})
   const [categorizedLists, setCategorizedLists] = useState({})
   const [isReady, setIsReady] = useState(false)
   const [globalLists, setGlobalLists] = useState([])
   const [scoresList, setScoresList] = useState([])

   async function updateUserData() {
      try{
         let subscriptions = await fetch('/api/users/subscriptions/' + session.user.id)
         if(subscriptions.status !== 200) return null
         subscriptions = await subscriptions.json()
         setUserLists(subscriptions.lists)
         getStats(subscriptions.lists)
         let scores = await fetch('/api/users/scores/' + session.user.id)
         scores = await scores.json()
         setScoresList(scores)
      } catch(e) {
         return null
      }
   }

   useEffect(() => {
      if(session) getLists()
      async function getLists() {
         updateUserData()
         let globalLists = await fetch('/api/lists')
         globalLists = await globalLists.json()
         setGlobalLists(globalLists)
      }
   }, [session])

   function getStats(lists) {
      const categorizedListsObject = {}
      lists.forEach((list) => {
         const categorizedList = {
            reviewed: [],
            needReview: [],
            remaining: [],
         }
         list.wordsList.forEach((word) => {
            const categorizedWord = { ...word, parentId: list._id }
            if (word.dueTime === -1)
               categorizedList.remaining.push(categorizedWord)
            else if (word.dueTime > Date.now())
               categorizedList.reviewed.push(categorizedWord)
            else if (word.dueTime < Date.now())
               categorizedList.needReview.push(categorizedWord)
         })
         categorizedListsObject[[list._id]] = categorizedList
      })
      setCategorizedLists(categorizedListsObject)
      setCategorizedWords(getCategorizedWordsObject(categorizedListsObject))
      setIsReady(true)
   }

   return (
      <StatsContext.Provider
         value={{
            userLists,
            categorizedWords,
            categorizedLists,
            isReady,
            globalLists,
            USER_ID: session?.user.id,
            scoresList,
            updateUserData,
         }}
      >
         {children}
      </StatsContext.Provider>
   )
}

function getCategorizedWordsObject(categorizedLists) {
   const wordsObject = {
      reviewed: [],
      needReview: [],
      remaining: [],
   }
   for (const key in categorizedLists) {
      const categorizedList = categorizedLists[key]
      for (const category in categorizedList) {
         wordsObject[category] = [
            ...wordsObject[category],
            ...categorizedList[category],
         ]
      }
   }
   return wordsObject
}
