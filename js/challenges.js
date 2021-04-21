import {getChallengesFile, getLimitersFile} from "./files.js";

export var challenges = {}
export var mutuallyExclusive = []
export var oneWayExclusive = {}
export var allButOne = []

export async function defineChallenges() {
    challenges = await getChallengesFile()
    let limiters = await getLimitersFile()
    mutuallyExclusive = limiters['mutually-exclusive']
    oneWayExclusive = limiters['one-way-exclusive']
}
