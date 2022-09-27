const BASE_URL = process.env.BASE_URL

export async function getUserData(session) {
   try {
      let subscriptions = await fetch(
         BASE_URL + 'api/users/subscriptions/' + session.user.id
      )
      let scores = await fetch(
         BASE_URL + 'api/users/scores/' + session.user.id
      )
      const globalLists = await getLists()
      subscriptions = await subscriptions.json()
      scores = await scores.json()
      const userLists = subscriptions.lists
      const { categorizedLists, categorizedWords } = getStats(
         subscriptions.lists
      )
      const scoresList = scores
      return {
         userLists,
         categorizedLists,
         categorizedWords,
         scoresList,
         globalLists,
      }
   } catch (e) {
      console.log(e)
      console.log('EWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
      return null
   }
}

async function getLists() {
   let globalLists = await fetch(BASE_URL+'api/lists')
   globalLists = await globalLists.json()
   return globalLists.lists
}

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
   const categorizedLists = categorizedListsObject
   const categorizedWords = getCategorizedWordsObject(categorizedListsObject)
   return { categorizedLists, categorizedWords }
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
