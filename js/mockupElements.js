var width = 400;
var screenName = "sampleScreen";

function updateScreen() {
    width = document.getElementById("width").value;
    screenName = document.getElementById("screenName").value;
    if (screenName == "") {
        alert("Don't leave screen name blank.");
    } else {
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
            document.getElementById("holder").style.backgroundSize = "100% 100%";
        }

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        } else {
            document.getElementById("holder").style.backgroundImage = "";
        }
    }
}

function addElement(item) {

    var elVal = document.getElementById('elementDesc').value;

    if (elVal == "") {
        alert("Don't leave it blank");
    } else {
        itemNo = $(".draggable").length + 1;

        if (item == "button") {
            document.getElementById("holder").innerHTML =
                document.getElementById("holder").innerHTML +
                '<div id="drag-' + itemNo.toString() + '" class="draggable" name="' + elVal + '" kind="button" style="width: 100px; height:100px;">\n<button style="width: 100%; height: 100%">' +
                elVal +
                '</button>\n<p class="overlay">' + itemNo.toString() + '</p>\n</div>\n';

        } else {
            if (item == "image") {
                document.getElementById("holder").innerHTML =
                    document.getElementById("holder").innerHTML +
                    '<div id="drag-' + itemNo.toString() + '" class="draggable" name="' + elVal + '" kind="input" style="width: 100px; height:100px;">\n\t<img height="100%" width="100%" alt="' + elVal + '">\n<p class="overlay">' + id.toString() + '</p>\n</div>\n';
            } else {
                if (item == "input") {
                    document.getElementById("holder").innerHTML =
                        document.getElementById("holder").innerHTML +
                        '<div id="drag-' + itemNo.toString() + '" class="draggable" name="' + elVal + '"changeItem kind="image" style="width: 100px; height:100px;">\n<input style="width: 100%; height: 100%" value="' + elVal + '>\n<p class="overlay">' + id.toString() + '</p>\n</div>\n';
                }
            }
        }
    }
}

function exportHTML(filename, autoScale, mimeType) {

    var autoScaleBlock = '<script>' +
        'function resizeEl(el, scaleW, scaleH){' +
        'var widthStr = el.style.width;' +
        'var heightStr = el.style.height;' +
        'var dataX;' +
        'var dataY;' +
        'var newValW = el.style.width.substring(0,widthStr.length-2) * scaleW;' +
        'var newValH = el.style.height.substring(0,heightStr.length-2) * scaleH;' +
        'if (widthStr != ""){' +
        'el.style.width = newValW;' +
        '}' +
        'if (heightStr != ""){' +
        'el.style.height = newValH;' +
        '}' +
        'if (el.getAttribute("data-x") != null && el.getAttribute("data-y") != null){' +
        'dataX = el.getAttribute("data-x") * scaleW;' +
        'dataY = el.getAttribute("data-y") * scaleH;' +
        'el.style.transform = "translate(" + dataX + "px, " + dataY + "px)";' +
        '}' +
        '}' +
        'function resizeScreen(){' +
        'var windowWidth = window.innerWidth;' +
        'var width = document.getElementById("holder").style.width.substring(0,document.getElementById("holder").style.width.length-2);' +
        'var windowHeight = window.innerHeight;' +
        'var height = document.getElementById("holder").style.height.substring(0,document.getElementById("holder").style.height.length-2);' +
        'var widthScale = windowWidth/width;' +
        'var heightScale = windowHeight/height;' +
        'var widthStr = document.getElementById("holder").style.width;' +
        'var heightStr = document.getElementById("holder").style.height;' +
        'var newValW = document.getElementById("holder").style.width.substring(0,widthStr.length-2) * widthScale;' +
        'var newValH = document.getElementById("holder").style.height.substring(0,heightStr.length-2) * heightScale;' +
        'document.getElementById("holder").style.width = newValW;' +
        'document.getElementById("holder").style.height = newValH;' +
        'for (i = 0; i < document.getElementsByClassName("draggable").length; i++) {' +
        'resizeEl(document.getElementsByClassName("draggable")[i], widthScale, heightScale);' +
        '}' +
        '}' +
        '</script>';

    var upSideBlock =
        '<html>' +
        '<head>' +
        '<title>' + screenName + ' by Moca' + '</title>' +
        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
        //'<meta name="viewport" content="width=' + width + ', initial-scale=1 maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">' +
        '<meta name="apple-mobile-web-app-capable" content="yes" />' +
        '<meta name="apple-touch-fullscreen" content="yes">' +
        '<link rel="apple-touch-icon" href="icon.png">' +
        '<link rel="manifest" href="manifest.json">' +
        '<link rel="icon" href="favicon.ico" type="image/x-icon">' +
        '<style>.draggable {width: 100px;height: 100px;background-color: #ffff;opacity: .7;color: #000000;padding: 1px;-webkit-transform: translate(0px, 0px);transform: translate(0px, 0px);}</style>';

    var closeUpSideBlock = '</head> <body style="margin:0">';
    var closeUpSideBlockOnLoad = '</head> <body onload="resizeScreen()" style="margin:0">';

    var bottomSideBlock =
        '</div>' +
        '</body>' +
        '<script>if ("serviceWorker" in navigator) {navigator.serviceWorker.register("sw.js").then(function(registration) {console.log("Registered:", registration);}).catch(function(error) {console.log("Registration failed: ", error);});}</script>' +
        '</html>';

    var midBlock = document.getElementById("holder").outerHTML;
    midBlock = midBlock.replace(/<p.*p>*/g, "");
    var pageHtml = upSideBlock;
    if (autoScale) {
        pageHtml = pageHtml + autoScaleBlock + closeUpSideBlockOnLoad;
    } else{
        pageHtml = pageHtml + closeUpSideBlock;
    }
    pageHtml = pageHtml + midBlock + bottomSideBlock;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(pageHtml));
    link.click();
}