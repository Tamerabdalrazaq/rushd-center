import ranges from "../data/ranges";

export function getScores(curves, rawScores) {
   const { qScore, vScore, eScore, avgs } = getSectionsScoresAvg(
      rawScores,
      curves
   );
   return {
      sectionsScores: { qScore, vScore, eScore },
      finalScores: getFinalScores(avgs),
   };
}

function getSectionsScoresAvg(rawScores, curves) {
   const { quantitative: qRaw, verbal: vRaw, english: eRaw } = rawScores;
   const { quantitative: qCurve, verbal: vCurve, english: eCurve } = curves;
   const qScore = qCurve[qRaw];
   const vScore = vCurve[vRaw];
   const eScore = eCurve[eRaw];
   const avgs = {
      general: (2 * (qScore + vScore) + eScore) / 5,
      qStress: (3 * qScore + vScore + eScore) / 5,
      vStress: (3 * vScore + qScore + eScore) / 5,
   };
   return { avgs, qScore, vScore, eScore };
}

function getFinalScores(avgs) {
   const { general, qStress, vStress } = avgs;
   return {
      gFinal: calculateFinalScore(general),
      qFinal: calculateFinalScore(qStress),
      vFinal: calculateFinalScore(vStress),
   };
}

function calculateFinalScore(avg) {
   if (avg === 150) return 800;
   if (avg === 50) return 200;
   const currentRange = ranges.find(
      (range) => range[0][0] <= avg && range[0][1] + 1 > avg
   );
   let scoreScopeRange = currentRange[1][1] - currentRange[1][0];
   const pointValue =
      scoreScopeRange / (currentRange[0][1] - currentRange[0][0] + 1);
   const finalScore =
      currentRange[1][0] + (avg - currentRange[0][0]) * pointValue;
   return Math.round(finalScore);
}

export function getDate() {
   let today = new Date();
   const dd = String(today.getDate()).padStart(2, "0");
   const mm = String(today.getMonth() + 1).padStart(2, "0");
   const yyyy = today.getFullYear();
   today = dd + "/" + mm + "/" + yyyy;
   return today;
}

export function organizeListsByParent(lists) {
   const organized = {};
   for (const list of lists) {
      if (list.custom) continue;
      if (organized[list.parent]) {
         organized[list.parent].push(list);
      } else {
         organized[list.parent] = [list];
      }
   }
   return organized;
}

export function msToTime(ms) {
   if (ms <= 0) return "0";
   let seconds = (ms / 1000).toFixed();
   let minutes = (ms / (1000 * 60)).toFixed();
   let hours = (ms / (1000 * 60 * 60)).toFixed();
   let days = (ms / (1000 * 60 * 60 * 24)).toFixed();
   if (seconds < 60) return seconds + " Sec";
   else if (minutes < 60) return minutes + " Min";
   else if (hours < 24) return hours + " Hrs";
   else return days + " Days";
}

export function joinObjectFields(obj) {
   let returned = [];
   for (const field in obj) returned = returned.concat(obj[field]);
   return returned;
}

export function findObjectById(arr, _id) {
   return arr.find((o) => o._id === _id);
}

export function sorted(array, callback) {
   let arr = [...array];
   arr.sort(callback);
   return arr;
}

export function randomRange(a, b) {
   return a + Math.floor(Math.random() * (b - a));
}

export function shuffledArray(array) {
   const shuffled = [...array];
   for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
   }
   return shuffled;
}

export function get_circle_color(dueTime) {
   if (dueTime == -1) return "remaining";
   const relativeDueTime = dueTime - Date.now();
   if (relativeDueTime > 0) return "reviewed";
   else return "needReview";
}
