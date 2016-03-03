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
            if (currentClicked.hasClass("slidelement") && !currentClicked.hasClass("elementediting")) {
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
                    launchEvent("click", document.getElementsByClassName("slidethumbholder")[0]);
                }
            }
            break;
        case "slidelement":
            if (isElementByClass("fullslider-slide", currentClicked) || isElementByClass("slidelement", currentClicked)) {
                if (!isElementByClass("elementediting", currentClicked)) {
                    Impressionist.prototype.cloneElement(elClipboard.value);
                    Impressionist.prototype.appendClonedElement();
                }
            }
            break;
    }
}


key('ctrl+c', function(e) {
    copyEl();
});

//key('ctrl+v', function(e) {
//    pasteEl();
//    changeContent();//Event for undo redo
//});




document.onpaste = function(e)
{

    var items = e.clipboardData.items;
    for (var i = 0; i < items.length; ++i) {
        if (items[i].kind == 'file' && items[i].type.indexOf('image/') !== -1) { //If clipboard has an image, paste it
            var blob = items[i].getAsFile();
            createImageFromBlob(blob);
            changeContent();//Event for undo redo  
        } else { //Else, paste Fullslider element
            pasteEl();
            changeContent();//Event for undo redo  
        }
    }
}; 