var me = Impressionist.prototype;

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
                    me.cloneSlide($(this));
                }
            },
            "Copy slide": {
                name: "Copy slide",
                icon: "copy",
                callback: function(key, options) {
                    me.selectCurrentClicked($(this));
                    copyEl();
                }
            },
            "Paste slide": {
                name: "Paste slide",
                icon: "paste",
                callback: function(key, options) {
                    me.selectCurrentClicked($(this));
                    pasteEl();
                }
            },
            "sep1": "---------",
            "Delete slide": {
                name: "Delete slide",
                icon: "delete",
                callback: function(key, options) {
                    $(this).find(".deletebtn").click();
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
                    me.selectCurrentClicked($(".slidethumbholder"));
                    pasteEl();
                }
            },
        }
    });

    $.contextMenu({
        selector: '.slidelement',
        callback: function(key, options) {

        },
        items: {
            "Set as pattern": {
                name: "Set as pattern",
                icon: "paste",
                callback: function(key, options) {
                    me.clearElementSelections();
                    $(this).removeClass();
                    $(this).draggable('disable');
                    $(this).unbind();

                    $(this).addClass("slidelement_pattern");
                    var pattern_uid = me.generateUID();
                    $(this).attr("data-pattern", pattern_uid);
                    var cloned = me.clonePatternElement($(this));
                    me.addPattern(pattern_uid, cloned);

                    me.deleteElement($(this));
                    me.addElemOnAllSlides(cloned);
                }
            },
        }
    });

    $.contextMenu({
        selector: '.slidelement_pattern',
        callback: function(key, options) {

        },
        items: {
            "Remove pattern": {
                name: "Remove pattern",
                icon: "paste",
                callback: function(key, options) {
                    me.clearElementSelections();

                    var pattern_uid = $(this).attr("data-pattern");
                    $(".fullslider-slide-container").find("[data-pattern='" + pattern_uid + "']").each(function() {
                        var slide_parent = $(this).parent();
                        me.deleteElement($(this));
                        me.updateScaledSlide(slide_parent);
                    });
                }
            },
        }
    });
});