import {maxPointScore, pointScore, update, wildPoints} from "./point-updates.js";
import {COLS, NON_COMMAND_COLS, settings, WILDCOLS} from "../index.js";

export function totalObjValueSum(obj) {
    let data = Object.keys(obj).map(k => obj[k])
    return parseFloat(data.reduce((a, b) => a + b))
}

function resetInputFields() {
    $('input').prop('checked', false);
    $('select').val(0).change()
}

function resetPointScores(hardReset) {
    for (let colType of COLS) {
        pointScore[colType] = 0
        if (hardReset)
            maxPointScore[colType] = 0
    }
    if (hardReset)
        wildPoints['max-points'] = 0
    wildPoints['points'] = 0
}

export function disableColumn(colName) {
    $(`#col-${colName}`).find('tr').each(function() {
        if (!$(this).find('.point-field').is(':disabled')) {
            setGettable($(this), false);
        }
    });
}

export function enableColumn(colName) {
    $(`#col-${colName}`).find('tr').each(function() {
        setGettable($(this), true);
    });
}

export function reset(hardReset = true) {
    resetInputFields()
    resetPointScores(hardReset)
}

export function getRandomNonCommandCol() {
    return getRandomFromArray(NON_COMMAND_COLS)
}

export function getRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function getTrField(trRef) {
    return trRef.find('.point-field')
}

export function getSelectedOptionValue(element) {
    return element.find('option:selected').attr('value')
}

export function getSelectedOptionValueInt(element) {
    return parseInt(getSelectedOptionValue(element))
}

const defaultColors = {true: '#000000', false: '#959595'}

function constructColorObject(colors) {
    if (!colors) {
        return defaultColors
    } else {
        for (let bool of [true, false]) {
            if (!(bool in colors))
                colors[bool] = defaultColors[bool]
        }
    }
    return colors
}

export function setGettable(tr, affordable, colors = null) {
    colors = constructColorObject(colors)
    let field = tr.find('.point-field')

    field.prop("disabled", !affordable)
    tr.css({'color': colors[affordable]})
}

export function startRandom() {
    reset()

    let totalScore = parseInt($('#point-selector').val())
    let fixedP = settings['fixedScorePercentage']

    let fixedPoints = Math.floor(totalScore * (fixedP / 100))
    let randoms = {}

    for (let col of COLS)
        if (!WILDCOLS.includes(col))
            randoms[col] = Math.random()

    let randomSum = totalObjValueSum(randoms)
    for (let col in randoms) {
        maxPointScore[col] = Math.round((randoms[col] / randomSum) * fixedPoints)
    }

    wildPoints['max-points'] = totalScore - totalObjValueSum(maxPointScore)

    update()
}

export function selectRandomFromTrArray(trArray) {
    let tr = getRandomFromArray(trArray)

    let pf = $($(tr).find('.point-field'))
    if (!pf.is(':disabled')) {
        if (pf[0].localName === "input") {
            pf.trigger('click')
        } else {
            let options = pf.find('option:enabled').not('option[value="0"]')
            if (options.length !== 0) {
                let option = getRandomFromArray(pf.find('option:enabled').not('option[value="0"]'))

                pf.find('option:enabled').prop('selected', false)
                $(option).prop('selected', true)
                $(option).parent().change()
            }
        }
    }
}
