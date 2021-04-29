function readTextFile(file, useID = false) {
    var ID = "";

    if (useID) {
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
        if (id != null) {
            ID = id + "/";
        }
    }

    var allText = null;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "localfolder://cefsharp/" + ID + file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function readCSV(file, useID = false) {
    return d3.csvParse(readTextFile(file, useID));
}

function readJSON(file, useID = false) {
    return JSON.parse(readTextFile(file, useID));
}
