import axios from "axios";
import { PHASE_TIMING } from "data/settings";
import { randomRange, shuffledArray } from "./helpers";

export function checkTextEquality(input, word) {
   input = input.trim().toLowerCase();
   word = word.trim().toLowerCase();
   const appends = ["", "e", "d", "ed", "s", "es", "ing"];
   for (const append of appends) {
      if (word + append == input || input + append == word) return true;
   }
   return false;
}

export async function updateWordStatus(pId, wId, dueTime, phase) {
   const data = await axios.patch("/api/userlists/wordstatus", {
      userListId: pId,
      wordId: wId,
      updates: {
         dueTime,
         phase,
      },
   });
   return data;
}

export function getDueTime(phase) {
   // const DAY_MS = 24 * 60 * 60 * 1000
   const MINUTE = 1000 * 60;
   const HOUR = MINUTE * 60;
   const DAY = HOUR * 24;
   const _phase = PHASE_TIMING[phase] ? phase : "default";
   return Date.now() + PHASE_TIMING[_phase] * DAY;
}

export function getWordStatus(answeredCorrectly) {
   if (answeredCorrectly === null) return "";
   if (answeredCorrectly === true) return "correct";
   if (answeredCorrectly === false) return "incorrect";
}

export function pick_n_random(arr, n) {
   const arr_copy = [...arr];
   const picked = [];
   for (let i = 0; i < n; i++) {
      const random = randomRange(0, arr_copy.length);
      picked.push(arr_copy[random]);
      arr_copy.splice(random, 1);
   }
   return picked;
}

export function create_answers(word, words, num_of_answers) {
   let words_copy = [...words];
   const word_index = words_copy.findIndex(
      (curr_word) => word._id === curr_word._id
   );
   words_copy.splice(word_index, 1);
   let answers = [word.meaning];
   const random_answers = pick_n_random(
      words_copy.map((w) => w.meaning),
      num_of_answers - 1
   );
   answers = shuffledArray([...answers, ...random_answers]);
   const correct_answer_index = answers.findIndex(
      (curr) => curr === word.meaning
   );
   return [answers, correct_answer_index];
}

export function trimWordsList(remainingList, needReviewList) {
   let sortedNeedReview = needReviewList.sort((a, b) => a.dueTime - b.dueTime);
   let finalArray;
   remainingList = shuffledArray(remainingList);
   if (remainingList.length + needReviewList.length <= 12)
      finalArray = [...sortedNeedReview, ...remainingList];
   else {
      if (remainingList.length < 6) {
         finalArray = [
            ...remainingList,
            ...sortedNeedReview.slice(0, 12 - remainingList.length),
         ];
      } else if (sortedNeedReview.length < 6) {
         finalArray = [
            ...sortedNeedReview,
            ...remainingList.slice(0, 12 - sortedNeedReview.length),
         ];
      } else {
         finalArray = [
            ...sortedNeedReview.slice(0, 6),
            ...remainingList.slice(0, 6),
         ];
      }
   }
   return finalArray;
}
