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
        }
    });
});