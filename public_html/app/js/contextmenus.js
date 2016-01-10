$(function() {
    $.contextMenu({
        selector: '.context-menu-slides',
        callback: function(key, options) {

        },
        items: {
            "Duplicate slide": {
                name: "Duplicate slide",
                icon: "copy",
                callback: function(key, options) {
                    Impressionist.prototype.cloneSlide($(this));
                }
            },
            "Copy slide": {
                name: "Copy slide",
                icon: "copy",
                callback: function(key, options) {
                    Impressionist.prototype.selectCurrentClicked($(this));
                    copyEl();
                }
            },
            "Paste slide": {
                name: "Paste slide",
                icon: "paste",
                callback: function(key, options) {
                    Impressionist.prototype.selectCurrentClicked($(this));
                    pasteEl();
                }
            },
        }
    });

    $.contextMenu({
        selector: '.context-menu-slidethumbholder',
        callback: function(key, options) {

        },
        items: {
            "Paste slide": {
                name: "Paste slide",
                icon: "paste",
                callback: function(key, options) {
                    Impressionist.prototype.selectCurrentClicked($(".slidethumbholder"));
                    pasteEl();
                }
            },
        }
    });
});