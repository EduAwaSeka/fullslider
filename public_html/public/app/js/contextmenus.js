var me = Impressionist.prototype;
var selectable_context_items = {
    "Set as pattern": {
        name: "Set as pattern",
        icon: function(opt, $itemElement, itemKey, item) {
            // Set the content to the menu trigger selector and add an bootstrap icon to the item.
            $itemElement.html('<span class="icon icon-pushpin context-menu-icon-left" aria-hidden="true"></span> ' + "Set as pattern");

            // Add the context-menu-icon-updated class to the item
            return 'context-menu-icon-updated';
        },
        callback: function(key, options) {
            me.clearElementSelections();
            $(this).removeClass();
            $(this).draggable('disable');
            $(this).unbind();

            $(this).addClass("slidelement_pattern");
            $(this).css("z-index", 1);
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
        icon: function(opt, $itemElement, itemKey, item) {
            // Set the content to the menu trigger selector and add an bootstrap icon to the item.
            $itemElement.html('<span class="icon icon-page-duplicate context-menu-icon-left" aria-hidden="true"></span> ' + "Duplicate element");

            // Add the context-menu-icon-updated class to the item
            return 'context-menu-icon-updated';
        },
        callback: function(key, options) {
            me.selectCurrentClicked($(this));
            copyEl();
            pasteEl();
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
    "To front(+1)": {
        name: "To front (+1)",
        icon: function(opt, $itemElement, itemKey, item) {
            // Set the content to the menu trigger selector and add an bootstrap icon to the item.
            $itemElement.html('<span class="fa fa-forward context-menu-icon-left" aria-hidden="true"></span> ' + "To front (+1)");

            // Add the context-menu-icon-updated class to the item
            return 'context-menu-icon-updated';
        },
        callback: function(key, options) {
            var zindex = parseInt($(this).css("z-index"));
            if (zindex) {
                zindex++;
            }
            else {
                zindex = 2;
            }
            $($(this)).css("z-index", zindex);
            changeContent();//Event for undo redo
        }
    },
    "To back (-1)": {
        name: "To back (-1)",
        icon: function(opt, $itemElement, itemKey, item) {
            // Set the content to the menu trigger selector and add an bootstrap icon to the item.
            $itemElement.html('<span class="fa fa-backward context-menu-icon-left" aria-hidden="true"></span> ' + "To back (-1)");

            // Add the context-menu-icon-updated class to the item
            return 'context-menu-icon-updated';
        },
        callback: function(key, options) {
            var zindex = parseInt($(this).css("z-index"));
            if (zindex) {
                zindex--;
            }
            else {
                zindex = 0;
            }
            $(this).css("z-index", zindex);
            changeContent();//Event for undo redo
        }
    },
    "To front of all": {
        name: "To front of all",
        icon: function(opt, $itemElement, itemKey, item) {
            // Set the content to the menu trigger selector and add an bootstrap icon to the item.
            $itemElement.html('<span class="fa fa-fast-forward context-menu-icon-left" aria-hidden="true"></span> ' + "To front of all");

            // Add the context-menu-icon-updated class to the item
            return 'context-menu-icon-updated';
        },
        callback: function(key, options) {
            var zindex = parseInt($(this).css("z-index"));
            zindex = 50;
            $($(this)).css("z-index", zindex);
            changeContent();//Event for undo redo
        }
    },
    "To back of all": {
        name: "To back of all",
        icon: function(opt, $itemElement, itemKey, item) {
            // Set the content to the menu trigger selector and add an bootstrap icon to the item.
            $itemElement.html('<span class="fa fa-fast-backward context-menu-icon-left" aria-hidden="true"></span> ' + "To back of all");

            // Add the context-menu-icon-updated class to the item
            return 'context-menu-icon-updated';
        },
        callback: function(key, options) {
            var zindex = parseInt($(this).css("z-index"));
            zindex = 0;
            $(this).css("z-index", zindex);
            changeContent();//Event for undo redo
        }
    },
    "sep2": "---------",
    "Delete element": {
        name: "Delete element",
        icon: "delete",
        callback: function(key, options) {
            $(this).find(".deletebtn").click();
            changeContent();//Event for undo redo
        }
    },
};
var selectable_image_context_items = $.extend(true, {}, selectable_context_items);
selectable_image_context_items["sep3"] = "---------";
selectable_image_context_items["Crop image"] = {
    name: "Crop image",
    icon: "paste",
    callback: function(key, options) {
        me.editImageElement(me.selectedElement[0]);
    }
};

/* Slides */
$(function() {
    $.contextMenu({
        selector: '.context-menu-slides',
        callback: function(key, options) {

        },
        items: {
            "Duplicate slide": {
                name: "Duplicate slide",
                icon: function(opt, $itemElement, itemKey, item) {
                    // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                    $itemElement.html('<span class="icon icon-page-duplicate context-menu-icon-left" aria-hidden="true"></span> ' + "Duplicate slide");

                    // Add the context-menu-icon-updated class to the item
                    return 'context-menu-icon-updated';
                },
                callback: function(key, options) {
                    me.selectCurrentClicked($(this));
                    copyEl();
                    me.selectCurrentClicked($(".slidethumbholder"));
                    pasteEl();
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
    //Selectable image
    $.contextMenu({
        selector: '.elementselectable[data-type="image"]',
        callback: function(key, options) {

        },
        items: selectable_image_context_items
    });

    //Selectable
    $.contextMenu({
        selector: '.elementselectable',
        callback: function(key, options) {

        },
        items: selectable_context_items
    });




    //Slide
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

    //Pattern
    $.contextMenu({
        selector: '.slidelement_pattern',
        callback: function(key, options) {

        },
        items: {
            "Remove pattern": {
                name: "Remove pattern",
                icon: function(opt, $itemElement, itemKey, item) {
                    // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                    $itemElement.html('<span class="fa fa-trash context-menu-icon-left" aria-hidden="true"></span> ' + "Remove pattern");

                    // Add the context-menu-icon-updated class to the item
                    return 'context-menu-icon-updated';
                },
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
            "Remove from this slide": {
                name: "Remove from this slide",
                icon: function(opt, $itemElement, itemKey, item) {
                    // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                    $itemElement.html('<span class="fa fa-times-circle context-menu-icon-left" aria-hidden="true"></span> ' + "Remove pattern from this slide");

                    // Add the context-menu-icon-updated class to the item
                    return 'context-menu-icon-updated';
                },
                callback: function(key, options) {
                    me.clearElementSelections();
                    var slide_parent = $(this).parent();
                    me.deleteElement($(this));
                    me.updateScaledSlide(slide_parent);
                    changeContent();//Event for undo redo
                }
            },
            "To front(+1)": {
                name: "To front (+1)",
                icon: function(opt, $itemElement, itemKey, item) {
                    // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                    $itemElement.html('<span class="fa fa-arrow-up context-menu-icon-left" aria-hidden="true"></span> ' + "To front (+1)");

                    // Add the context-menu-icon-updated class to the item
                    return 'context-menu-icon-updated';
                },
                callback: function(key, options) {
                    var zindex = parseInt($(this).css("z-index"));
                    if (zindex) {
                        zindex++;
                    }
                    else {
                        zindex = 2;
                    }
                    var data_pattern = $(this).attr("data-pattern");
                    var all = $("#workspace").find("[data-pattern=" + data_pattern + "]");
                    for (var i = 0; i < all.length; i++) {
                        $(all[i]).css("z-index", zindex);
                    }
                    me.updatePattern($(this));

                    changeContent();//Event for undo redo
                }
            },
            "To back (-1)": {
                name: "To back (-1)",
                icon: function(opt, $itemElement, itemKey, item) {
                    // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                    $itemElement.html('<span class="fa fa-arrow-down context-menu-icon-left" aria-hidden="true"></span> ' + "To back (-1)");

                    // Add the context-menu-icon-updated class to the item
                    return 'context-menu-icon-updated';
                },
                callback: function(key, options) {
                    var zindex = parseInt($(this).css("z-index"));
                    if (zindex) {
                        zindex--;
                    }
                    else {
                        zindex = 0;
                    }
                    var data_pattern = $(this).attr("data-pattern");
                    var all = $("#workspace").find("[data-pattern=" + data_pattern + "]");
                    for (var i = 0; i < all.length; i++) {
                        $(all[i]).css("z-index", zindex);
                    }
                    changeContent();//Event for undo redo
                }
            },
        }
    });

    //editing
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
            //            "Paste": {
            //                name: "Paste",
            //                icon: "paste",
            //                callback: function(key, options) {
            //                    me.pasteTextFromClipboard(this);
            //                    changeContent();//Event for undo redo
            //                }
            //            },
        }
    });

    /* End elements */

    $(".context-menu-item").on("mouseover", function() {
        $($(this).find(".context-menu-icon-left")[0]).css("color", "#fff");
    });
    $(".context-menu-item").on("mouseout", function() {
        $($(this).find(".context-menu-icon-left")[0]).css("color", "#4A80B9");
    });

});