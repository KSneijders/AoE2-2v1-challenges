import {update} from "./point-updates.js";
import {htmlCol, pointNonTableRow, pointTableRowInTdMax, tableRow} from "./html-blobs.js";
import {challenges} from "./challenges.js";
import {COLS, PLAYERS} from "../index.js";
import {reset} from "./helper.js";

export function buildPage() {
    // Set point values to defaults, create columns and point table
    let pointsTable = $('#points-wrapper table')

    reset()

    for (let colType of COLS) {
        let colString = htmlCol
            .replaceAll('{{DISPLAYNAME}}', colType)
            .replaceAll('{{ID}}', `col-${colType}`)
        $('#col-wrapper').append(colString)

        pointsTable.append(pointTableRowInTdMax.replaceAll('{{COLTYPE}}', colType))
    }
    pointsTable.append(pointTableRowInTdMax
        .replaceAll('{{COLTYPE}}', 'total')
    )
    pointsTable.append('<tr><td style="height: 1em"></td></tr>')
    pointsTable.after(pointNonTableRow
        .replaceAll('{{COLTYPE}}', 'wild')
        .replaceAll('{{COMMENT}}', 'wild points used')
    )

    // Add table to each column
    $('#col-wrapper .column .col-body').append('<table>')

    // Create challenge entries
    for (let colsKey of COLS) {
        let table = $(`#col-${colsKey} table`)

        for (let challengesEntry of challenges[colsKey]) {
            let box = '<input class="point-field" type="checkbox">'
            if (challengesEntry.range) {
                box = '<select class="point-field"><option value="0">0</option>'
                for (let i = 0; i < challengesEntry.range.length; i++) {
                    box += `<option value="${i + 1}">${challengesEntry.range[i]}</option>`
                }
                box += '</select>'
            }

            let attributes = ""
            if (challengesEntry.uniqueIdentifier)
                attributes = `id="${challengesEntry.uniqueIdentifier}"`
            let tableRowString = tableRow
                .replaceAll('{{CHECK}}', box)
                .replaceAll('{{POINTS}}', challengesEntry.points)
                .replaceAll('{{POINTS_TEXT}}', challengesEntry.points)
                .replaceAll('{{NAME}}', challengesEntry.name)
                .replaceAll('{{ATTRIBUTES}}', attributes)
            table.append(tableRowString)
        }
    }

    // Create player dropdown
    for (let player of PLAYERS) {
        $('#player-selector').append(`<option value="${player}">${player}</option>`)
    }

    update()
}