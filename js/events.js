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

$(document).on('click', '#random-generator-button', function () {
    reset()

    let totalScore = parseInt($('#point-selector').val())
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

$(document).on('input', '#point-selector', function () {
    reset()
    let fixedP = settings['fixedScorePercentage']
    let value = $(this).val()
    let fixedPoints = Math.floor(value * (fixedP / 100))
    $('#player-total-score').html(`${value} ~${fixedPoints}`)

    // localStorage.getItem('set-points');
    // localStorage.removeItem('set-points');
    localStorage.setItem('set-points', value);
    update()
})

function getColType(thisRef) {
    return $(thisRef).parent().parent().parent().parent().parent().attr('coltype')
}