export async function getSettingsFile() {
    return $.ajax({
        type: "GET",
        url: "./json/settings.json",
        contentType: "application/json",
        dataType: "json",
        data: {}
    });
}

export async function getChallengesFile() {
    return $.ajax({
        type: "GET",
        url: "./json/challenges.json",
        contentType: "application/json",
        dataType: "json",
        data: {}
    });
}

export async function getLimitersFile() {
    return $.ajax({
        type: "GET",
        url: "./json/limiters.json",
        contentType: "application/json",
        dataType: "json",
        data: {}
    });
}
