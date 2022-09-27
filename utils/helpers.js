import ranges from "../data/ranges";

export function getScores(curves, rawScores) {
    const { qScore, vScore, eScore, avgs } = getSectionsScoresAvg(rawScores, curves)
    return {
        sectionsScores: {qScore, vScore, eScore},
        finalScores: getFinalScores(avgs),
    }
}

function getSectionsScoresAvg(rawScores, curves) {
    const { quantitative: qRaw, verbal: vRaw, english: eRaw } = rawScores
    const { quantitative: qCurve, verbal: vCurve, english: eCurve } = curves
    const qScore = qCurve[qRaw];
    const vScore = vCurve[vRaw];
    const eScore = eCurve[eRaw];
    const avgs = {
        general: (2*(qScore+vScore)+ eScore)/5,
        qStress: (3*(qScore) + vScore + eScore)/5,
        vStress: (3*(vScore) + qScore + eScore)/5,
    }
    return {avgs, qScore, vScore, eScore};   
}

function getFinalScores(avgs) {
    const { general, qStress, vStress } = avgs
    return {
        gFinal: calculateFinalScore(general),
        qFinal: calculateFinalScore(qStress),
        vFinal: calculateFinalScore(vStress)
    }
}

function calculateFinalScore(avg) {
    if (avg === 150) return 800;
    if (avg === 50) return 200
    const currentRange =  ranges.find((range) => (range[0][0] <= avg && (range[0][1] + 1) > avg ))
    let scoreScopeRange = currentRange[1][1] - currentRange[1][0];
    const pointValue = scoreScopeRange/(currentRange[0][1] - currentRange[0][0] + 1);
    const finalScore = (currentRange[1][0] + ((avg-currentRange[0][0])*pointValue));
    return Math.round(finalScore);
}

export function getDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return today
}