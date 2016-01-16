function scalePlay(element) {
    var elem_height = element.offsetHeight;
    var rel = getRel();
    var heightVW = elem_height / rel;
    var halfHeightVW = heightVW / 2;

    $("#play").css("width", $(element).css("width"));
    $("#play").css("top", $(element).css("top"));
    $("#play").css("left", $(element).css("left"));

    $("#play").children(".scale").css("top", ((elem_height - 2) / rel) + "vw");
    $("#play").children(".skewy").css("top", halfHeightVW - 0.57 + "vw");
    $("#play").children(".rotate").css("top", halfHeightVW - 0.49 + "vw");

    //0.5 height of ui-resizable button / 2 = 0.25
    var sTop = heightVW - 0.25;
    $("#play").children(".ui-resizable-s").css("top", sTop + "vw");
    $("#play").children(".ui-resizable-sw").css("top", sTop + "vw");
    $("#play").children(".ui-resizable-se").css("top", sTop + "vw");

    var sideTop = halfHeightVW - 0.25;
    $("#play").children(".ui-resizable-e").css("top", sideTop + "vw");
    $("#play").children(".ui-resizable-w").css("top", sideTop + "vw");
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


function isInElement(parent, element) {
    return ((parent.has(element).length > 0) || element.html() == parent.html());
}

function isElementByClass(parentClass, element) {
    return (element.hasClass(parentClass) || element.parent().hasClass(parentClass));
}

function get_font_name(font) {
    var name = font;
    if (font[0] === "'") {
        name = name.substr(name.indexOf("'") + 1, name.lastIndexOf("'") - 1);
    }
    else {
        name = name.substr(0, name.lastIndexOf(","));
    }
    return name;
}


function extractValue(e) {
    var value = e.target.dataset.value;
    if (value == null) {
        $target = $(e.target);
        value = $target.parent()[0].dataset.value;
    }
    return value;
}