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
        if (items[i].kind == 'file' && items[i].type.indexOf('image/') !== -1) {
            var blob = items[i].getAsFile();

            var blobURL = URL.createObjectURL(blob);


            var i = new Image();

            i.onload = function() {
                me.addImageToSlide({name: "name", src: this.src + name, width: this.width, height: this.height});
            };
            i.src = blobURL;

//
//            var reader = new FileReader();
//            reader.onload = function(event) {
//                var image =dataURItoBlob(event.target.result);
//                var image_url= decodeURIComponent(URL.createObjectURL(image).replace("blob:",""));
//                $.post("/upimagefromurl", {urlimageinput: image_url}, function(json) {
//                    me.addImageToSlide(json);
//                }, 'json');
//            }; // data url!
//            reader.readAsDataURL(blob);


        } else { //Else paste Fullslider element
            pasteEl();
            changeContent();//Event for undo redo  
        }
    }
}; 