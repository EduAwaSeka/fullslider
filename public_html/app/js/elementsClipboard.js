var elClipboard = {
    type: "",
    value: ""
};

function setElClipboard(type, value) {
    elClipboard.type = type;
    elClipboard.value = value;
}

function copyEl() {
    var currentClicked = Impressionist.prototype.getCurrentClicked();
    if (currentClicked !== "") {
        if (currentClicked.hasClass("slidethumb")) {
            setElClipboard("slidethumb", currentClicked);
        }
        else {
            if (currentClicked.hasClass("slidelement")) {
                setElClipboard("slidelement", currentClicked);
            }
        }
    }
    else {
        setElClipboard("", "");
    }
}

function pasteEl() {
    var currentClicked = Impressionist.prototype.getCurrentClicked();
    switch (elClipboard.type) {
        case "slidethumb":
            if (isInElement($(".slidethumbholder"), currentClicked)) {
                if (isElementByClass("slidethumb", currentClicked)) {
                    Impressionist.prototype.copySlideToSlide(elClipboard.value);
                }
                else {
                    Impressionist.prototype.cloneSlide(elClipboard.value);
                }
            }
            break;
        case "slidelement":
            if (isElementByClass("slidelement", elClipboard.value)) {
                Impressionist.prototype.cloneElement(elClipboard.value);
                Impressionist.prototype.appendClonedElement();

            }
            break;
    }
}


key('ctrl+c', function(e) {
    copyEl();
});

key('ctrl+v', function(e) {
    pasteEl();
});
