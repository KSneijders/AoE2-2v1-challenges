import {getChallengesFile, getLimitersFile} from "./files.js";

export var challenges = {}
export var EXCLUDE = {}


export async function defineChallenges() {
    challenges = await getChallengesFile()
    let limiters = await getLimitersFile()
    let mutuallyExclusive = limiters['mutually-exclusive']
    let oneWayExclusive = limiters['one-way-exclusive']

    for (let entry of mutuallyExclusive) {
        for (let i = 0; i < entry.length; i++) {
            getDefault(EXCLUDE, entry[i]).push(...entry.filter(k => k !== entry[i]))
        }
    }

    for (let key of Object.keys(oneWayExclusive)) {
        getDefault(EXCLUDE, key).push(...oneWayExclusive[key])
        for (let item of oneWayExclusive[key]) {
            getDefault(EXCLUDE, item).push(key)
        }
    }
}

function getDefault(obj, key) {
    if (!(key in obj)) obj[key] = []
    return obj[key]
}