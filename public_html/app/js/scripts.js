function scalePlay(element) {
    var elem_height = element.offsetHeight;

    $("#play").css("width", $(element).css("width"));
    $("#play").css("top", $(element).css("top"));
    $("#play").css("left", $(element).css("left"));

    $("#play").children(".scale").css("top", elem_height-4);
    $("#play").children(".skewy").css("top", elem_height * 2 / 5);
    $("#play").children(".rotate").css("top", elem_height * 2 / 5);
}

function getFontSize(element) {
    return element.css("font-size").replace(/[^-\d\.]/g, '');
}

function pxToRem(value) {
    return value / obtainRel();
}


function remToPx(value) {
    return value * obtainRel();
}

function obtainRel() {
    return $("html").css("font-size").replace(/[^-\d\.]/g, '');
}

function launchEvent(event, element) {
    var nouEvent = document.createEvent("MouseEvents");
    nouEvent.initMouseEvent(event, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(nouEvent);
}