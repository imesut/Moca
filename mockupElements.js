var id = 1;
var width = 400;

function updateScreen() {
    width = document.getElementById("width").value;
    document.getElementById("holder").style.width = width;
    document.getElementById("holder").style.height = document.getElementById("height").value;
    updateBg();
}

function updateBg() {
    var file = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader = new FileReader();
    reader.onloadend = function () {
        var rhs = "url('" + reader.result + "')";
        console.log(rhs);
        document.getElementById("holder").style.background = rhs;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        document.getElementById("holder").style.backgroundImage = "";
    }
}

function addElement() {
    var elVal = document.getElementById('elementDesc').value;

    if (elVal == "") {
        alert("Don't leave it blank");
    } else {
        id = id + 1

        document.getElementById("holder").innerHTML =
            document.getElementById("holder").innerHTML +
            '<div id="drag-' + id.toString() + '" class="draggable">\n\t<img height="100%" width="100%" alt="' + elVal + '">\n</div>\n';
        console.log(elVal);
    }

}

var upSideBlock = '<html>' +
    '<head>' + '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
    '<meta name="viewport" content="width=' + width + ', initial-scale=1">' +
    '    <link rel="stylesheet" href="style.css" type="text/css">' +
    '</head>' +
    '<body style="margin:0">'

var bottomSideBlock = '    </div>' + '</body>' + '</html>'

function viewCode() {
    document.getElementById("codeViewArea").value = upSideBlock + document.getElementById("holder").outerHTML + bottomSideBlock;
}

function exportHTML(filename, mimeType) {
    var pageHtml = upSideBlock + document.getElementById("holder").outerHTML + bottomSideBlock;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(pageHtml));
    link.click();
}