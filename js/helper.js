import {maxPointScore, pointScore, wildPoints} from "./point-updates.js";
import {COLS, settings} from "../index.js";

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
    wildPoints['points'] = 0
}

export function reset(hardReset = true) {
    resetInputFields()
    resetPointScores(hardReset)
    wildPoints['points'] = 0
    wildPoints['max-points'] = 0
}

export function getTrField(trRef) {
    return trRef.find('.point-field')
}

export function getSelectedOptionValue(element) {
    return element.find('option:selected').attr('value')
}

export function getSelectedOptionValueInt(element) {
    return parseInt(element.find('option:selected').attr('value'))
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