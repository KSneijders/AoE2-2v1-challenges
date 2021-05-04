import {mutuallyExclusive, oneWayExclusive} from "./challenges.js";
import {getSelectedOptionValueInt, getTrField, setGettable} from "./helper.js";

export function hasLimiter(ref) {
    return ref.attr('id') !== undefined
}

let colors = {false: '#af0000'}

export function updateLimits(ref) {
    let refId = ref.attr('id')
    let field = getTrField(ref)
    // if (!field.is(':checked')) return   // --> Was this just a performance if ???

    for (let mutuallyExclusiveEntry of mutuallyExclusive) {
        if (mutuallyExclusiveEntry.includes(refId) && !field.is(':disabled')) {
            for (let id of mutuallyExclusiveEntry) {
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

    for (let oneWayHost in oneWayExclusive) {
        if (refId === oneWayHost && !field.is(':disabled')) {
            for (let id of oneWayExclusive[oneWayHost]) {
                let otherRef = $('#'+id)
                let otherField = getTrField(otherRef)
                otherField.prop('checked', false)

                if (id !== refId && !otherField.is(':disabled')) {
                    setGettable(otherRef, !field.is(':checked'), colors)
                }
            }
        }
    }
}
