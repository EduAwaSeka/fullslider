var elClipboard = "";

key('ctrl+c', function(e) {
    var currentClicked = Impressionist.prototype.getCurrentClicked();
    if (currentClicked !== "") {
        if ($("#" + currentClicked).hasClass("slidethumb")) {
            elClipboard = {
                type: "slidethumb",
                value: $("#" + currentClicked)
            };
        }
    }
});

key('ctrl+v', function(e) {
    switch (elClipboard.type){
        case "slidethumb":
            Impressionist.prototype.cloneSlide(elClipboard.value);
            break;
    } 
});
