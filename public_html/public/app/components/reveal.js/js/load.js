function cleanBase64Params(param){
    param=param.replace(/ /g, '+');
    param=param.replace(/=/g, '');
    return param;
}

if (sessionStorage.preview) {
    document.getElementById("slides").innerHTML = sessionStorage.preview;
    document.title = sessionStorage.title;
}
else {
    var params = purl(window.location.href).param(); // returns 'blue'
    if (params.slides) {
        document.getElementById("slides").innerHTML = atob(cleanBase64Params(params.slides));
    }

}

function exitFullscreen() {

    var element = document.body;

    // Check which implementation is available
    var requestMethod = element.cancelFullScreen ||
            element.webkitCancelFullscreen ||
            element.webkitCancelFullScreen ||
            element.mozCancelFullScreen ||
            element.msCancelFullscreen;

    if (requestMethod) {
        requestMethod.apply(element);
    }

}

function toggleFullScreen() {
    var elem = document.body;
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}