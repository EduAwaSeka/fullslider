var me = Impressionist.prototype;

/* Slides */
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
                    changeContent();//Event for undo redo
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
                    changeContent();//Event for undo redo
                }
            },
            "sep1": "---------",
            "Delete slide": {
                name: "Delete slide",
                icon: "delete",
                callback: function(key, options) {
                    $(this).find(".deletebtn").click();
                    changeContent();//Event for undo redo
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
                    changeContent();//Event for undo redo
                }
            },
        }
    });
    
    /* End Slides */
    
    
    /* Elements */

    $.contextMenu({
        selector: '.elementselectable',
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

                    changeContent();//Event for undo redo
                }
            },
            "Duplicate element": {
                name: "Duplicate element",
                icon: "copy",
                callback: function(key, options) {
                    me.cloneSlide($(this));
                    changeContent();//Event for undo redo
                }
            },
            "Copy element": {
                name: "Copy element",
                icon: "copy",
                callback: function(key, options) {
                    me.selectCurrentClicked($(this));
                    copyEl();
                }
            },
            "Paste element": {
                name: "Paste element",
                icon: "paste",
                callback: function(key, options) {
                    me.selectCurrentClicked($(this));
                    pasteEl();
                    changeContent();//Event for undo redo
                }
            },
            "sep1": "---------",
            "Delete element": {
                name: "Delete element",
                icon: "delete",
                callback: function(key, options) {
                    $(this).find(".deletebtn").click();
                    changeContent();//Event for undo redo
                }
            },
        }
    });


    $.contextMenu({
        selector: '.fullslider-slide',
        callback: function(key, options) {

        },
        items: {
            "Paste element": {
                name: "Paste element",
                icon: "paste",
                callback: function(key, options) {
                    me.selectCurrentClicked($(this));
                    pasteEl();
                    changeContent();//Event for undo redo
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
                    me.removePattern(pattern_uid);
                    changeContent();//Event for undo redo
                }
            },
        }
    });




    $.contextMenu({
        selector: '.elementediting',
        className: 'contextmenu-textEditing',
        callback: function(key, options) {

        },
        items: {
            "Copy": {
                name: "Copy",
                icon: "copy",
                callback: function(key, options) {
                    me.copyTextToClipboard(this);
                }
            },
            "Cut": {
                name: "Cut",
                icon: "cut",
                callback: function(key, options) {
                    me.cutTextToClipboard(this);
                    changeContent();//Event for undo redo
                }
            },
            "Paste": {
                name: "Paste",
                icon: "paste",
                callback: function(key, options) {
                    me.pasteTextFromClipboard(this);
                    changeContent();//Event for undo redo
                }
            },
        }
    });
    
    /* End elements */
});