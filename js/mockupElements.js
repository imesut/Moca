var id = 1;
var width = 400;
var screenName = "sampleScreen";

function updateScreen() {
    width = document.getElementById("width").value;
    screenName = document.getElementById("screenName").value;
    if (screenName == ""){
        alert("Don't leave screen name blank.");
    } else{
        document.getElementById("holder").style.width = width + "px";
        document.getElementById("holder").style.height = document.getElementById("height").value + "px";
        updateScreenImage();
    }   
}

function updateScreenImage() {
    var file = document.querySelector('input[type=file]').files[0]; //sames as here
    if (file != null) {
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
}

function addElement(item) {

    console.log(id);

    var elVal = document.getElementById('elementDesc').value;

    if (elVal == "") {
        alert("Don't leave it blank");
    } else {
        id = id + 1

        if (item == "button") {
            document.getElementById("holder").innerHTML =
                document.getElementById("holder").innerHTML +
                '<div id="drag-' + id.toString() + '" class="draggable">\n<button style="width: 100%; height: 100%">' +
                elVal +
                '</button>\n<p class="overlay">' + id.toString() + '</p>\n</div>\n';

        } else {
            if (item == "image") {
                document.getElementById("holder").innerHTML =
                    document.getElementById("holder").innerHTML +
                    '<div id="drag-' + id.toString() + '" class="draggable">\n\t<img height="100%" width="100%" alt="' + elVal + '">\n<p class="overlay">' + id.toString() + '</p>\n</div>\n';
            } else {
                if (item == "input") {
                    document.getElementById("holder").innerHTML =
                        document.getElementById("holder").innerHTML +
                        '<div id="drag-' + id.toString() + '" class="draggable">\n<input style="width: 100%; height: 100%" value="' + elVal + '>\n<p class="overlay">' + id.toString() + '</p>\n</div>\n';
                }
            }
        }
    }
}

function exportHTML(filename, mimeType) {

    var upSideBlock =
        '<html>' +
        '<head>' +
        '<title>' + screenName + ' by Moca' + '</title>' +
        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
        //'<meta name="viewport" content="width=' + width + ', initial-scale=1 maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">' +
        '<meta name="apple-mobile-web-app-capable" content="yes" />' + 
        '<meta name="apple-touch-fullscreen" content="yes">' +
        '<link rel="stylesheet" href="style.css" type="text/css">' +
        '<link rel="apple-touch-icon" href="icon.png">' +
        '<link rel="icon" href="favicon.ico" type="image/x-icon">' +
        '</head>' +
        '<body style="margin:0">';

    var bottomSideBlock =
        '</div>' +
        '</body>' +
        '</html>';

    var midBlock = document.getElementById("holder").outerHTML;
    midBlock = midBlock.replace(/<p.*p>*/g, "");
    var pageHtml = upSideBlock + midBlock + bottomSideBlock;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(pageHtml));
    link.click();
}