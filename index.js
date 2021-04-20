import {getSettingsFile} from "./js/settings.js";
import {buildPage} from "./js/page.js";

export const PLAYERS = ['delano', 'seth', 'kerwin']
export const COLS = ['economics', 'military', 'building', 'technologies', 'commands', 'miscellaneous']
export const WILDCOLS = ['commands', 'miscellaneous']
export const NON_WILDCOLS = COLS.filter((element) => {return !WILDCOLS.includes(element)})

export let settings = {}

getSettingsFile().then(
    (data) => {
        for (let player of PLAYERS) {
            if (!(player in data['score']))
                throw new Error(`Unknown player. Please add ${player} to the settings.json`)
        }

        settings = data
        buildPage()
    }
);
