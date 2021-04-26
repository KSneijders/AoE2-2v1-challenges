import {COLS, NON_WILDCOLS, WILDCOLS} from "../index.js";
import {getSelectedOptionValueInt, setGettable, totalObjValueSum} from "./helper.js";
import {hasLimiter, updateLimits} from "./challenge-limiters.js";

export const pointScore = {};
export const maxPointScore = {};
export const wildPoints = {'points': 0, 'max-points': 0};

function getPointSpentInCol(colType) {
    if (colType === undefined)
        throw new Error("colType cannot be undefined")

    let totalPoints = 0;
    let elements = $(`#col-${colType} .col-body table tr`)
    for (let i = 0; i < elements.length; i++) {
        let element = $(elements[i])
        let points = parseInt(element.attr('points'))

        let selector = element.find('.point-field')
        switch (selector[0].localName) {
            case 'select':
                let quantifier = getSelectedOptionValueInt(element)
                points *= quantifier
                break
            case 'input':
                if (!selector.is(':checked'))
                    points = 0
                break
            default:
                points = 0
                break
        }
        totalPoints += points
    }

    return totalPoints
}

function setPoints(colType, value) {
    pointScore[colType] = value
    update()
}

function updatePointDistribution() {
    let wildPoint = 0

    for (let col of COLS)
        if (pointScore[col] > maxPointScore[col])
            wildPoint += (pointScore[col] - maxPointScore[col])

    let points = 0
    for (let col of NON_WILDCOLS) {
        points += Math.max(maxPointScore[col] - pointScore[col], 0)
    }
    let spendableWildPoints = getSpendableWildPoints()

    maxPointScore['commands'] = points + spendableWildPoints
    maxPointScore['miscellaneous'] = points + spendableWildPoints

    wildPoints['points'] = wildPoint
}

function updateChallengesView() {
    for (let colType of COLS) {
        let isWildCol = WILDCOLS.includes(colType)

        $(`#col-${colType} tr`).each(function () {
            let points = parseInt($(this).attr('points'))
            let field = $(this).find('.point-field')
            let localName = field[0].localName
            let spendable = getSpendablePoints(colType, isWildCol)

            if (localName === 'input' && !field.is(':checked')) {
                let affordable = points <= spendable
                setGettable($(this), affordable)
            } else if (localName === 'select') {
                let anyAffordable = false
                $(this).find('option').each(function () {
                    let value = $(this).attr('value')
                    let affordable = points * value <= spendable
                    $(this).prop("disabled", !affordable)
                    if (affordable && value !== '0')
                        anyAffordable = true
                })
                if (getSelectedOptionValueInt(field) === 0)
                    setGettable($(this), anyAffordable)
            }
        })
    }

    updateChallengeLimiters()
}

function updateChallengeLimiters() {
    for (let colType of COLS) {
        $(`#col-${colType} tr`).each(function () {
            if (hasLimiter($(this))) {
                updateLimits($(this))
            }
        });
    }
}

function getSpendablePoints(colType, isWildCol) {
    let nonWildColsLeft = 0
    let wildColsSpent = 0
    for (let col of NON_WILDCOLS) {
        nonWildColsLeft += Math.max(maxPointScore[col] - pointScore[col], 0)
    }
    for (let col of WILDCOLS) {
        wildColsSpent += pointScore[col]
    }

    if (!isWildCol) {
        return Math.min(
            nonWildColsLeft - wildColsSpent + getSpendableWildPoints(),
            Math.max(maxPointScore[colType] - pointScore[colType], 0) + getSpendableWildPoints()
        )
    } else {
        return nonWildColsLeft - wildColsSpent + getSpendableWildPoints()
    }
}

function getSpendableWildPoints() {
    return wildPoints['max-points'] - wildPoints['points']
}

function updatePointsView() {
    let totalScore = parseInt($('#point-selector').val())

    for (let col of COLS) {
        $(`#point-${col} .points`).html(pointScore[col])
        $(`#point-${col} .max-points`).html(maxPointScore[col])
    }

    let wildP = wildPoints['points']
    let wildMaxP = wildPoints['max-points']

    $(`#point-wild .points`).html(wildP)
    $(`#point-wild .max-points`).html(wildMaxP)

    $(`#point-total .points`).html(totalObjValueSum(pointScore))
    $(`#point-total .max-points`).html(totalScore)
}

function updateSelectedChallengesView() {
    let list = $('#challenge-list-body')
    list.html('')
    let ul = $('<ul></ul>')

    $('#col-wrapper input:checked').each(function () {
        let txt = $(this).parent().parent().find('td:nth-child(3)').text()

        console.log(txt)
        if ($(this).parents().eq(4).attr('coltype') === "commands" && txt !== "Choose civilisation") {
            ul.append(`<li>Command: ||${txt}||</li>`)
        } else {
            ul.append(`<li>${txt}</li>`)
        }
    });

    $('#col-wrapper select option:selected').each(function () {
        if ($(this).attr('value') !== '0') {
            let txt = $(this).parent().parent().parent().find('td:nth-child(3)').text()
            ul.append(`<li>${txt} (${$(this).attr('effect')})</li>`)
        }
    });
    list.append(ul)
}

function update() {
    updatePointDistribution()

    // Views
    updateChallengesView()
    updatePointsView()
    updateSelectedChallengesView()
}

export {
    setPoints,
    getPointSpentInCol,
    update,
    updateChallengeLimiters
}