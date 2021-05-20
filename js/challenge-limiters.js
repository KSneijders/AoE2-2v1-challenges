import {EXCLUDE} from "./challenges.js";
import {getSelectedOptionValueInt, getTrField, setGettable} from "./helper.js";

export function hasLimiter(ref) {
    return ref.attr('id') !== undefined
}

let colors = {false: '#af0000'}

export function updateLimits(ref) {
    let refId = ref.attr('id')
    let field = getTrField(ref)
    // if (!field.is(':checked')) return   // --> Was this just a performance if ???

    if (refId in EXCLUDE && !field.is(':disabled')) {
        for (let id of EXCLUDE[refId]) {
            let otherRef = $('#'+id)

            let isUsed;
            if (field[0].localName === "select") {
                isUsed = getSelectedOptionValueInt(field) > 0
            } else {
                isUsed = field.is(':checked')
            }

            if (id !== refId && !getTrField(otherRef).is(':disabled')) {
                setGettable(otherRef, !isUsed, colors)
            }
        }
    }
}
