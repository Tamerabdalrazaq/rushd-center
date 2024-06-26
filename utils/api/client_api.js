import axios from "axios";

const BASE_URL = process.env.BASE_URL;

export async function getUserData(session) {
   try {
      let subscriptions = axios.get(
         BASE_URL + "api/users/subscriptions/" + session.user.id
      );
      let scores = axios.get(BASE_URL + "api/users/scores/" + session.user.id);
      const globalLists_req = getLists();
      const promises = await Promise.all([
         subscriptions,
         scores,
         globalLists_req,
      ]);
      const [subscriptions_res, scores_res, globalLists] = promises;
      subscriptions = subscriptions_res.data;
      scores = scores_res.data;
      const userLists = subscriptions.lists;
      const { categorizedLists, categorizedWords } = categorizeUserLists(
         subscriptions.lists
      );
      const scoresList = scores;
      return {
         userLists,
         categorizedLists,
         categorizedWords,
         scoresList,
         globalLists,
      };
   } catch (e) {
      console.log(e);
      console.log("EWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
      return null;
   }
}

async function getLists() {
   let globalLists = await fetch(BASE_URL + "api/lists");
   globalLists = await globalLists.json();
   return globalLists.lists;
}

export function categorizeUserLists(lists) {
   const categorizedListsObject = {};
   lists.forEach((list) => {
      const categorizedList = {
         reviewed: [],
         needReview: [],
         remaining: [],
      };
      list.wordsList.forEach((word) => {
         const categorizedWord = { ...word, parentId: list._id };
         if (word.dueTime === -1)
            categorizedList.remaining.push(categorizedWord);
         else if (word.dueTime > Date.now())
            categorizedList.reviewed.push(categorizedWord);
         else if (word.dueTime < Date.now())
            categorizedList.needReview.push(categorizedWord);
      });
      categorizedListsObject[[list._id]] = categorizedList;
   });
   const categorizedLists = categorizedListsObject;
   const categorizedWords = getCategorizedWordsObject(categorizedListsObject);
   return { categorizedLists, categorizedWords };
}

function getCategorizedWordsObject(categorizedLists) {
   const wordsObject = {
      reviewed: [],
      needReview: [],
      remaining: [],
   };
   for (const key in categorizedLists) {
      const categorizedList = categorizedLists[key];
      for (const category in categorizedList) {
         wordsObject[category] = [
            ...wordsObject[category],
            ...categorizedList[category],
         ];
      }
   }
   return wordsObject;
}

export async function collectWords(relevantWords) {
   const wordsIds = relevantWords.map((word) => word._id);
   let words = (await axios.post("/api/words/collect", { wordsIds })).data
      .words;
   return words;
}

export async function subscribe_user(USER_ID, list_id, custom) {
   const res = await axios.post("/api/users/subscriptions", {
      userId: USER_ID,
      listId: list_id,
      custom,
   });
   return res;
}
export async function create_new_word(
   list_id,
   body,
   userList_id,
   custom = true
) {
   try {
      let res = await axios.post("/api/words", {
         parentId: list_id,
         custom: true,
         ...body,
      });
      const word_id = res.data.newWord._id;
      res = await axios.patch("/api/users/subscriptions", {
         user_list: userList_id,
         word_id,
      });
      console.log("----------------");
      console.log(res);
      return res;
   } catch (e) {
      alert("An Error has occured");
      console.log(e);
   }
}
