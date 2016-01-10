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
    }
    else {
        setElClipboard("", "");
    }
}

function pasteEl() {
    switch (elClipboard.type) {
        case "slidethumb":
            var currentClicked = Impressionist.prototype.getCurrentClicked();
            if (isInElement($(".slidethumbholder"), currentClicked)) {
                Impressionist.prototype.cloneSlide(elClipboard.value);
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
