const htmlCol =
    `<div id='{{ID}}' coltype='{{DISPLAYNAME}}' class='column'>
        <div class='col-head'><cap>{{DISPLAYNAME}}</cap></div>
        <div class='col-body'></div>
    </div>`

const tableRow =
    `<tr {{ATTRIBUTES}} points='{{POINTS}}'>
        <td>{{CHECK}}</td>
        <td style='font-weight: bold; text-align: center'>{{POINTS_TEXT}}</td>
        <td>{{NAME}}</td>
    </tr>`

const pointTableRow =
    `<tr id="point-{{COLTYPE}}">
        <td><b><cap>{{COLTYPE}}:</cap></b></td>
        <td><span class="points">??</span></td>
        <td><span class="max-points">??</span></td>
    </tr>`

const pointTableRowInTdMax =
    `<tr id="point-{{COLTYPE}}">
        <td><b><cap>{{COLTYPE}}:</cap></b></td>
        <td><span class="points">??</span>/<span class="max-points">??</span></td>
    </tr>`

const pointNonTableRow =
    `<p id="point-{{COLTYPE}}">
        <b><cap>{{COLTYPE}}:</cap>
        </b> <span class="points">??</span>/<span class="max-points">??</span> {{COMMENT}}
    </p>`

const challengeListTableRow =
    `<tr>
        <td><img style="width: 16px; height: 16px" src="{{IMAGE_SRC}}"></td>
        <td>{{TEXT}}</td>
    </tr>`

const challengeListTableRowImageLess =
    `<tr>
        <td style="width: 16px;"></td>
        <td>{{TEXT}}</td>
    </tr>`

const challengeHeaderRow =
    `<tr class="header-row">
        <td colspan="2"><b><cap>{{TEXT}}</cap></b></td>
    </tr>`

export {
    htmlCol,
    tableRow,
    pointTableRow,
    pointTableRowInTdMax,
    pointNonTableRow,
    challengeListTableRow,
    challengeListTableRowImageLess,
    challengeHeaderRow
}
