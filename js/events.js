import {getPointSpentInCol, setPoints, update, updateChallengeLimiters} from "./point-updates.js";
import {COLS, NON_COMMAND_COLS, settings} from "../index.js";
import {
    disableColumn,
    enableColumn,
    getRandomNonCommandCol,
    reset,
    selectRandomFromTrArray,
    startRandom
} from "./helper.js";
import {tableRow} from "./html-blobs.js";

$(document).on('change', '.column input', function () {
    let coltype = getColType(this)

    setPoints(coltype, getPointSpentInCol(coltype))
});

$(document).on('change', '.column select', function () {
    if ($(this).is(':disabled')) return

    let coltype = getColType(this)

    setPoints(coltype, getPointSpentInCol(coltype))
});

$(document).on('click', '#reset-challenges', function () {
    reset(false);
    update()

    if (window.PLAY_MODE === "duo") {
        disableColumn('commands')
    } else if (window.PLAY_MODE === "solo") {
        COLS.forEach(disableColumn)
    }
});

$(document).on('input', '#point-selector', function () {
    reset()

    let value = $(this).val()
    $('#command-points').html(Math.floor(value / 2))

    localStorage.setItem('set-points', value);
    update()
})

$(document).on('click', '#generate-duo', function () {
    window.PLAY_MODE = "duo"
    startRandom();

    let maxPoints = parseInt($(`#point-total .max-points`).text())
    while (maxPoints > parseInt($(`#point-total .points`).text())) {
        let randomCol = getRandomNonCommandCol()
        selectRandomFromTrArray($(`#col-${randomCol}`).find('tr'))
    }

    enableColumn('commands')
    updateChallengeLimiters()
    disableColumn('commands')
});

$(document).on('click', '#generate-solo', function () {
    window.PLAY_MODE = "solo"
    let maxPoints = parseInt($(`#command-points`).text())

    let ps = $('#point-selector')
    let old = ps.val()
    ps.val(maxPoints)

    startRandom()

    while (maxPoints > parseInt($(`#point-commands .points`).text())) {
        selectRandomFromTrArray($('#col-commands').find('tr'))
    }

    NON_COMMAND_COLS.forEach(disableColumn)
    ps.val(old)

    if (Math.random() < (1 / 20))
        addChooseCiv()
});

function addChooseCiv() {
    let chooseCiv = tableRow
        .replaceAll('{{CHECK}}', '<input class="point-field" type="checkbox">')
        .replaceAll('{{POINTS}}', '0')
        .replaceAll('{{POINTS_TEXT}}', '-')
        .replaceAll('{{NAME}}', 'Choose civilisation')
        .replaceAll('{{ATTRIBUTES}}', '')
    $(`#col-commands table`).append(chooseCiv)
    $(`#col-commands table tr:last-child input`).prop({'checked': true})

    update()

    $(`#col-commands table tr:last-child`).remove()
}

function getColType(thisRef) {
    return $(thisRef).parent().parent().parent().parent().parent().attr('coltype')
}
