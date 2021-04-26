import {getSettingsFile} from "./js/files.js";
import {buildPage} from "./js/page.js";
import {defineChallenges} from "./js/challenges.js";

export const COLS = ['economics', 'military', 'building', 'technologies', 'miscellaneous', 'commands']
export const NON_COMMAND_COLS = COLS.filter((element) => {return element !== 'commands'});
export const WILDCOLS = ['miscellaneous', 'commands']
export const NON_WILDCOLS = COLS.filter((element) => {return !WILDCOLS.includes(element)});

window.PLAY_MODE = ""

export var settings = undefined

async function start() {
    settings = await getSettingsFile()
    await defineChallenges()
    buildPage()
}

start().then(() => console.log('Application ready!'))