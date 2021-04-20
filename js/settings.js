async function getSettingsFile() {
    return $.ajax({
        type: "GET",
        url: "./json/settings.json",
        contentType: "application/json",
        dataType: "json",
        data: {}
    });
}

export {getSettingsFile}