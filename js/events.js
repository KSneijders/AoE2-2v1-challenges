import {getPointSpentInCol, maxPointScore, setPoints, update, wildPoints} from "./point-updates.js";
import {COLS, settings, WILDCOLS} from "../index.js";
import {getSelectedOptionValue, reset, totalObjValueSum} from "./helper.js";

$(document).on('change', '.column input', function () {
    let coltype = getColType(this)

    setPoints(coltype, getPointSpentInCol(coltype))
});

$(document).on('change', '.column select', function () {
    if ($(this).is(':disabled')) return

    let coltype = getColType(this)

    setPoints(coltype, getPointSpentInCol(coltype))
});

$(document).on('change', '#player-selector', function () {
    reset()
    let player = getSelectedOptionValue($(this))

    let totalScore = settings['score'][player]
    let fixedP = settings['fixedScorePercentage']
    let fixedPoints = Math.floor(totalScore * (fixedP / 100))

    $('#player-total-score').html(`${totalScore} ~${fixedPoints}`)
});

$(document).on('click', '#random-generator-button', function () {
    let player = getSelectedOptionValue($('#player-selector'))
    if (!player) return

    reset()

    let totalScore = settings['score'][player]
    let fixedP = settings['fixedScorePercentage']
    let fixedPoints = Math.floor(totalScore * (fixedP / 100))
    let randoms = {}

    for (let col of COLS) {
        if (!WILDCOLS.includes(col)) {
            randoms[col] = Math.random()
        }
    }

    let randomSum = totalObjValueSum(randoms)
    for (let col in randoms) {
        maxPointScore[col] = Math.round((randoms[col] / randomSum) * fixedPoints)
    }

    wildPoints['max-points'] = totalScore - totalObjValueSum(maxPointScore)

    update()
});

$(document).on('click', '#reset-challenges', function() {
    reset(false)
    update()
});

function getColType(thisRef) {
    return $(thisRef).parent().parent().parent().parent().parent().attr('coltype')
}