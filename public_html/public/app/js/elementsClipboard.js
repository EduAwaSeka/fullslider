var elClipboard = {
    type: "",
    value: ""
};

//To control elClipboard and system clipboard
var newCopied = false;
var isCopiedImage = false;

function setElClipboard(type, value) {
    elClipboard.type = type;
    elClipboard.value = value;
    if (isCopiedImage) {
        isCopiedImage = false;
        newCopied = true;
    }
}

function copyEl() {
    document.execCommand('copy', false, null);
    var currentClicked = me.getCurrentClicked();
    if (currentClicked !== "") {
        if (currentClicked.hasClass("slidethumb")) {
            var slideId = me.slideIdFromThumb(currentClicked);
            setElClipboard("slidethumb", $("#" + slideId).clone());
        }
        else {
            if (currentClicked.hasClass("slidelement") && !currentClicked.hasClass("elementediting")) {
                setElClipboard("slidelement", currentClicked.clone());
            }
        }
    }
    else {
        setElClipboard("", "");
    }
}

function pasteEl() {
    var currentClicked = me.getCurrentClicked();
    switch (elClipboard.type) {
        case "slidethumb":
            if (isInElement($(".slidethumbholder"), currentClicked)) {
                if (isElementByClass("slidethumb", currentClicked)) {
                    me.copySlideToSlide(elClipboard.value);
                    changeContent();//Event for undo redo  
                }
                else {
                    me.cloneSlide(elClipboard.value);
                    launchEvent("click", document.getElementsByClassName("slidethumbholder")[0]);
                    changeContent();//Event for undo redo  
                }
            }
            break;
        case "slidelement":
            if (isElementByClass("fullslider-slide", currentClicked) || isElementByClass("slidelement", currentClicked)) {
                if (!isElementByClass("elementediting", currentClicked)) {
                    pasteSlidelement();
                }
            }
            else {
                if (isInElement($(".slidethumbholder"), currentClicked)) {
                    if (isElementByClass("slidethumb", currentClicked)) {
                        pasteSlidelement();
                    }
                }
            }
            break;
    }
}

function pasteSlidelement() {
    me.cloneElement(elClipboard.value);
    me.appendClonedElement();
    changeContent();//Event for undo redo  
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
        //If there is an image on clipboard and slide or slide element is current clicked -> paste image
        if ((items[i].kind == 'file' && items[i].type.indexOf('image/') !== -1) && (!newCopied || isCopiedImage) && (isElementByClass("fullslider-slide", me.currentClicked) || isElementByClass("slidelement", me.currentClicked))) { //If clipboard has an image, paste it
            var blob = items[i].getAsFile();
            createImageFromBlob(blob);
            newCopied = false;
            isCopiedImage = true;
            break;
        } else { //Else, paste Fullslider element
            if (i == items.length - 1) {
                pasteEl();
                break;
                newCopied = false;
                isCopiedImage = false;
            }
        }
    }
}; 