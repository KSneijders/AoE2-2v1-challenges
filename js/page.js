import {update} from "./point-updates.js";
import {htmlCol, pointNonTableRow, pointTableRowInTdMax, tableRow} from "./html-blobs.js";
import {challenges} from "./challenges.js";
import {COLS} from "../index.js";
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

            let box;
            let pointText = challengesEntry.points
            if (challengesEntry['range'] || challengesEntry['c-range']) {
                let customRange = challengesEntry.hasOwnProperty('c-range')
                let key = customRange ? 'c-range' : 'range'
                let points = []

                box = '<select class="point-field" style="width: 60px"><option value="0">0</option>'
                for (let i = 0; i < challengesEntry[key].length; i++) {
                    let entry = challengesEntry[key][i]
                    if (!customRange) {
                        let points = challengesEntry['points']
                        box += `<option effect="${entry}" value="${i + 1}">${entry}, ${points * (i + 1)}</option>`
                    } else {
                        let [val, txt] = entry
                        box += `<option effect="${txt}" value="${val}">${txt}, ${val}</option>`
                        points.push(val)
                    }
                }
                box += '</select>'

                if (customRange) {
                    pointText = `${points[0]}+`
                } else {
                    pointText += '<sup>x</sup>'
                }
            } else {
                box = `<input class="point-field" type="checkbox">`
            }

            let attributes = ""
            if (challengesEntry['id'])
                attributes = `id="${challengesEntry['id']}"`
            let tableRowString = tableRow
                .replaceAll('{{CHECK}}', box)
                .replaceAll('{{POINTS}}', challengesEntry['points'])
                .replaceAll('{{POINTS_TEXT}}', pointText)
                .replaceAll('{{NAME}}', challengesEntry['name'])
                .replaceAll('{{ATTRIBUTES}}', attributes)
            table.append(tableRowString)
        }
    }

    let oldPoints = localStorage.getItem('set-points')
    if (oldPoints) $('#point-selector').val(oldPoints).trigger('input')

    update()
}