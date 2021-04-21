function readTextFile(file) {
    var allText = null;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "../" + file, false);
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

function readCSV(file) {
    return d3.csvParse(readTextFile(file));
}

function readJSON(file) {
    return JSON.parse(readTextFile(file));
}
