function scalePlay(element) {
    var elem_height = element.offsetHeight;

    $("#play").css("width", $(element).css("width"));
    $("#play").css("top", $(element).css("top"));
    $("#play").css("left", $(element).css("left"));

    $("#play").children(".scale").css("top", ((elem_height - 3) / getRel()) + "vw");
    $("#play").children(".skewy").css("top", ((elem_height * 2 / 5) / getRel()) + "vw");
    $("#play").children(".rotate").css("top", ((elem_height * 2 / 5) / getRel()) + "vw");
}

function getFontSize(element) {
    return element.css("font-size").replace(/[^-\d\.]/g, '');
}

function pxToVw(value) {
    return value / getRel();
}


function vwToPx(value) {
    return value * getRel();
}

function getRel() {
    return $("html").css("font-size").replace(/[^-\d\.]/g, '');
}

function launchEvent(event, element) {
    var nouEvent = document.createEvent("MouseEvents");
    nouEvent.initMouseEvent(event, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(nouEvent);
}

function drawElement(element) {
    var rel = getRel();
    var top = element.offsetTop / rel;
    var left = element.offsetLeft / rel;
    $(element).css("top", top + "vw");
    $(element).css("left", left + "vw");
}

function openAlert(type, msg) {    
    var alertId="#"+type+"alert";
    var msgId="#"+type+"msg";
    
    $(alertId).fadeOut(0);
    $(msgId).html(msg);
    $(alertId).fadeIn(500);

    window.setTimeout(function() {
        $(alertId).fadeOut(1200);
    }, 5000);
}