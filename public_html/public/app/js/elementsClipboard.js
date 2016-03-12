var elClipboard = {
    type: "",
    value: ""
};

function setElClipboard(type, value) {
    elClipboard.type = type;
    elClipboard.value = value;
}

function copyEl() {
    var currentClicked = me.getCurrentClicked();
    if (currentClicked !== "") {
        if (currentClicked.hasClass("slidethumb")) {
            var slideId =me.slideIdFromThumb(currentClicked);
            setElClipboard("slidethumb", $("#"+slideId).clone());
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
                }
                else {
                    me.cloneSlide(elClipboard.value);
                    launchEvent("click", document.getElementsByClassName("slidethumbholder")[0]);
                }
            }
            break;
        case "slidelement":
            if (isElementByClass("fullslider-slide", currentClicked) || isElementByClass("slidelement", currentClicked)) {
                if (!isElementByClass("elementediting", currentClicked)) {
                    me.cloneElement(elClipboard.value);
                    me.appendClonedElement();
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
        //If there is an image on clipboard and slide or slide element is current clicked -> paste image
        if ((items[i].kind == 'file' && items[i].type.indexOf('image/') !== -1) && (isElementByClass("fullslider-slide", me.currentClicked) || isElementByClass("slidelement", me.currentClicked))) { //If clipboard has an image, paste it
            var blob = items[i].getAsFile();
            createImageFromBlob(blob);
        } else { //Else, paste Fullslider element
            pasteEl();
            changeContent();//Event for undo redo  
        }
    }
}; 