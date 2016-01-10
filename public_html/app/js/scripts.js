function scalePlay(element) {
    var elem_height = element.offsetHeight;
    var rel=getRel();

    $("#play").css("width", $(element).css("width"));
    $("#play").css("top", $(element).css("top"));
    $("#play").css("left", $(element).css("left"));

    $("#play").children(".scale").css("top", ((elem_height - 3) / rel) + "vw");
    var skey_rotate_top=(elem_height * 2 / 5);
    $("#play").children(".skewy").css("top", (skey_rotate_top / rel) + "vw");
    $("#play").children(".rotate").css("top", (skey_rotate_top / rel) + "vw");
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
    var alertId = "#" + type + "alert";
    var msgId = "#" + type + "msg";

    $(alertId).fadeOut(0);
    $(msgId).html(msg);
    $(alertId).fadeIn(500);

    window.setTimeout(function() {
        $(alertId).fadeOut(1200);
    }, 5000);
}

function calculateMaxWidth(element, parent) {
    var left = $(element).position().left;
    var width = parent.width();
    return pxToVw(width - left);
}
function calculateMaxHeight(element, parent) {

    var top = $(element).position().top;
    var height = parent.height();
    return pxToVw(height - top);
}

function decreaseSize(element) {
    var size = getFontSize(element);
    var fontSizeReadout = document.getElementsByClassName('fontSizeReadout')[0];
    size = pxToVw(size);
    if (size <= 1) {
        if (size == 1) {
            element.css("font-size", size + "vw");
            fontSizeReadout.innerHTML = parseInt(getFontSize(element));
        }
        return false;
    }
    else {
        size = size - 0.5;
        element.css("font-size", size + "vw");
        fontSizeReadout.innerHTML = parseInt(getFontSize(element));
        return true;
    }
}


function eventInto(parentClass,e){
    return (($("."+parentClass).has(e.target).length > 0) || $(e.target).hasClass(parentClass));
}