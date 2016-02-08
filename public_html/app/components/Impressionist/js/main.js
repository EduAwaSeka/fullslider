/**
 * Client id - 813346482484.apps.googleusercontent.com
 */
Impressionist = function()
{

    this.slidecounter = 0;
    this.menuopen = false;

    this.selectedElement;
    this.selectedforedit;

    this.clonedElement;
    this.selectedSlide;

    this.orchestrationcoords = [];
    this.selectedOrchElement;
    this.lastslideleftpos = 0;

    this.saveKey = "fullslider_decks";
    this.lastSaved = "fullslider_lastsaved";

    this.currentPresentation;
    this.mypresentations = [];
    this.mode = "create";
    this.loggedinstate = false;
    this.dropdownopen = false;
    this.currentClicked = "";


    this.isBold = false;
    this.isItalic = false;
    this.isUnderlined = false;
    this.isLeftAligned = false;
    this.isRightAligned = false;
    this.isCenterAligned = false;

    this.vxmax = 6000;
    //Viewport x min
    this.vxmin = -6000;
    //Viewport y max
    this.vymax = 6000;
    //Viewport y min
    this.vymin = -6000;
    //Window x max
    this.wxmax = 960;
    //Window x min
    this.wxmin = 0;
    //Window y max
    this.wymax = 630;
    //Window y min
    this.wymin = 0;
    this.slidewxmax = 960;
    this.slidewxmin = 0;
    this.slidewymax = 630;
    this.slidewymin = 0;

    this.normalSize = 1.75;
    this.titleSize = 3.5;
    this.subtitleSize = 2.75;

    this.normalFont = "'Montserrat', sans serif";
    this.titleFont = "'Montserrat', sans serif";
    this.subtitleFont = "'Montserrat', sans serif";

    this.normalColor = "#000";
    this.titleColor = "#000";
    this.subtitleColor = "#000";

    this.boundTextOption = "nothingradio";

    this.patterns = {};
};
Impressionist.prototype =
        {
            initialize: function()
            {
                me = this;
                me.continueInit();
//                me.openNewPresentationWindow();
            },
            continueInit: function()
            {
                me.removelisteners();
                me.attachListeners();
                me.initializeWelcomePanel();
                me.initializeImageModal();
                me.initializeNewPresModal();
                me.initializeMyPresModal();
                me.initializeConfigModal();
                me.initializeAlerts();
                me.setupColorpickerPopup();
                me.setupMenuItemEvents();
                me.enableSort();
//                me.setupPopover();
                me.hideTransformControl();
                //Load array with all saved presentations
                var presentations = me.getSavedPresentations();
                me.renderPresentations(presentations);
                //Load last saved presentation
//                 me.openLastSavedPresentation();

                me.openWelcomePanel();
            },
            initializeWelcomePanel: function() {
                $("#modals").append(welcome_panel);
            },
            initializeImageModal: function() {
                $("#modals").append(add_img_modal);
            },
            initializeNewPresModal: function() {
                $("#modals").append(new_pres_modal);
            },
            initializeMyPresModal: function() {
                $("#modals").append(my_pres_modal);
            },
            initializeConfigModal: function() {
                $("#modals").append(config_modal);
                $('#configTab a').click(function(e) {
                    $(this).tab('show');
                });
                var text_config_li = $("#textFormat").find("ul").children();
                var normal_children = $(text_config_li[0]).children();
                var title_children = $(text_config_li[1]).children();
                var subt_children = $(text_config_li[2]).children();

                $(normal_children[1]).attr("id", "normal_text_size");
                $(normal_children[2]).attr("id", "normal_text_font");
                $(normal_children[3]).attr("id", "normal_text_color");

                $(title_children[1]).attr("id", "title_text_size");
                $(title_children[2]).attr("id", "title_text_font");
                $(title_children[3]).attr("id", "title_text_color");

                $(subt_children[1]).attr("id", "subt_text_size");
                $(subt_children[2]).attr("id", "subt_text_font");
                $(subt_children[3]).attr("id", "subt_text_color");


            },
            initializeAlerts: function() {
                $("#modals").append(alert_danger);
                $("#dangeralert").fadeOut(0);
                $("#modals").append(alert_success);
                $("#successalert").fadeOut(0);
            },
            openWelcomePanel: function() {
                $("#welcomemodal").removeClass("hide");
                $("#welcomemodal").modal("show");
            },
            openLastSavedPresentation: function()
            {
                var presentation = JSON.parse(me.getItem(me.lastSaved));
                console.log("lastsaved", presentation);
                if (!presentation)
                {
                    var savedpresos = JSON.parse(me.getItem(me.saveKey));
                    console.log("savedpresos", savedpresos);
                    if (savedpresos && savedpresos.length > 0)
                    {
                        $("#savedpresentationsmodal").removeClass("hide");
                        $("#savedpresentationsmodal").modal("show");
                    }
                    else
                    {
                        me.openNewPresentationWindow();
                    }

                }
                else
                {
                    me.currentPresentation = presentation;
                    console.log("Retrieved id: ", me.currentPresentation);
                    me.loadPresentation(me.currentPresentation);
                }
            },
            openNewPresentationWindow: function()
            {
                $("#newpresentationmodal").removeClass("hide");
                $("#newpresentationmodal").modal("show");
                $("#newpresoheader").html("Create New Presentation");
                me.mode = "create";
            },
            renderPresentations: function(presentations)
            {
                me.mypresentations = presentations;
                $("#savedpresentations").html("<h3 style='display:inline-block; color:#2980B9; font-size:120%'> You don't have any saved presentations. </h3>");
                if (presentations.length > 0)
                {
                    $("#savedpresentations").html("");
                }
                for (var i = 0; i < presentations.length; i++)
                {
                    presentation = presentations[i];
                    templ = saved_presentations;
                    templ = templ.split("__presotitle__").join(presentation.title);
                    templ = templ.split("__presoid__").join(presentation.id);
                    $("#savedpresentations").append(templ);
                }
                $(".deletepresobtn").on("click", function(e)
                {
                    var msg = confirm("Are you sure?");
                    if (msg == true)
                    {
                        me.deleteSavedPresentation($(this).attr("data-id"));
                    }
                    else
                    {
                        console.log("do nothing");
                    }

                });
                //$("#savedpresentationsmodal").modal("show");
            },
            hideTransformControl: function()
            {
                $("#play").css("display", "none");
            },
            cloneElement: function(element)
            {
                clone = element.clone();
                clone.attr("id", "slideelement_" + me.generateUID());
                clone.css("left", pxToVw(element.position().left) + 0.2 + "vw");
                clone.css("top", pxToVw(element.position().top + 0.2) + "vw");
                me.clonedElement = clone;
                return me.clonedElement;
            },
            clonePatternElement: function(element)
            {
                var clone = element.clone();
                var id = clone.attr("id").replace(/[0-9]/g, '');
                id = id + me.generateUID();
                clone.attr("id", id);
                return clone;
            },
            appendClonedElement: function()
            {
                console.log(me.clonedElement, "clonedelement");
                me.selectedSlide.append(me.clonedElement);
                var id = $(me.clonedElement).attr("id");
                me.enableDrag();
                me.selectedElement = $("#" + id);
                me.generateScaledSlide(me.selectedSlide);
                //On create text element, this is selected with click event
                launchEvent("click", me.selectedelement);
            },
            setupMenuItemEvents: function()
            {
                $("#makebold").on("click", function(e)
                {
                    e.stopPropagation();
                    document.execCommand('bold', false, null);
                });
                $("#makeitalic").on("click", function(e)
                {
                    e.stopPropagation();
                    document.execCommand('italic', false, null);
                });
                $("#makeunderline").on("click", function(e)
                {
                    e.stopPropagation();
                    document.execCommand('underline', false, null);
                });
                $("#makealignleft").on("click", function(e)
                {
                    e.stopPropagation();
                    document.execCommand('justifyLeft', false, null);
                });
                $("#makealignright").on("click", function(e)
                {
                    e.stopPropagation();
                    document.execCommand('justifyRight', false, null);
                });
                $("#makealigncenter").on("click", function(e)
                {
                    e.stopPropagation();
                    document.execCommand('justifyCenter', false, null);
                });
            },
            enableSort: function()
            {
                $(".slidethumbholder").sortable({
                    update: function(event, ui)
                    {
                        console.log("sort updated", event, ui);
                        me.assignSlideNumbers();
                        me.reArrangeFullsliderSlides();
                        changeContent();//Event for undo redo
                    }
                });
                //$(".slidethumbholder").disableSelection();
            },
            cloneSlide: function(slide)
            {
                var uid = me.generateUID();
                var originalUid = slide.attr("id").replace("slidethumb_", "");

                //Clone thumbnail
                var clonedThumb = slide.clone();
                clonedThumb.attr("id", "slidethumb_" + uid);
                clonedThumb.removeClass("context-menu-active");
                $(".slidethumbholder").append(clonedThumb);
                $("#slidethumb_" + uid).animate({opacity: 1}, 200);

                //Change old uid by new uid in new thumbnail's deletebtn and canvas
                var deletebtn = $("#slidethumb_" + uid + " > #deletebtn");
                deletebtn.attr("data-parent", "slidethumb_" + uid);
                var thumbCanvas = $("#slidethumb_" + uid + " > canvas");
                thumbCanvas.attr("id", "slidethumb_" + uid);
                me.addSlideEvents();

                //Clone Slide
                var clonedSlide = $("#fullslider_slide_" + originalUid).clone();
                clonedSlide.attr("id", "fullslider_slide_" + uid);
                $(".fullslider-slide-container").append(clonedSlide);
                var children = $("#fullslider_slide_" + uid).children();
                for (var i = 0; i < children.length; i++)
                {
                    $(children[i]).attr("id", "slidelement_" + me.generateUID());
                }

                me.selectSlide("#fullslider_slide_" + uid);
                me.selectThumb(uid);
                me.enableDrag();
                me.updateScaledSlide(me.selectedSlide);
                me.selectCurrentClicked($("#slidethumb_" + uid));
            },
            copySlideToSlide: function(slidethumb) {
                var originalUid = slidethumb.attr("id").replace("slidethumb_", "");
                var slideUid = me.currentClicked.attr("id").replace("slidethumb_", "");

                var copiedSlide = $("#fullslider_slide_" + originalUid);
                var slide = $("#fullslider_slide_" + slideUid);

                slide.html(copiedSlide.html());

                var children = slide.children();
                for (var i = 0; i < children.length; i++)
                {
                    $(children[i]).attr("id", "slidelement_" + me.generateUID());
                }

                me.selectSlide("#fullslider_slide_" + slideUid);
                me.updateScaledSlide(me.selectedSlide);
                me.selectThumb(slideUid);
                me.enableDrag();
                me.selectCurrentClicked($("#slidethumb_" + slideUid));

            },
            reArrangeFullsliderSlides: function()
            {
                children = $(".slidethumbholder").children();
                var clonedElements = [];
                for (var i = 0; i < children.length; i++)
                {
                    child = children[i];
                    console.log("Rearrange child", child.id);
                    id = (child.id).split("_")[1];
                    el = $("#fullslider_slide_" + id);
                    clonedElements.push(el);
                }
                $(".fullslider-slide-container").html("");
                for (var j = 0; j < clonedElements.length; j++)
                {
                    console.log("el", clonedElements[j]);
                    $(".fullslider-slide-container").append(clonedElements[j]);
                }
                me.enableDrag();
            },
            rotateElement: function(value)
            {
                //me.selectedOrchElement.css("transform-origin", "0 0");

                rotx = me.selectedOrchElement.attr("data-rotate-x");
                roty = me.selectedOrchElement.attr("data-rotate-y");
                s = "";
                if (rotx != undefined)
                {
                    s += "rotateX(" + rotx + "deg)";
                }
                if (roty != undefined)
                {
                    s += "rotateY(" + roty + "deg)";
                }
                str = s + " rotate(" + value + "deg)";
                me.selectedOrchElement.css("transform", str);
                console.log("css", me.selectedOrchElement.css("transform"));
                me.selectedOrchElement.attr("data-rotate", value);
                id = me.selectedOrchElement.attr("id").split("_")[1];
                console.log("Updating slidethumb", $("#slidethumb_" + id));
                $("#slidethumb_" + id).attr("data-rotate-x", rotx);
                $("#slidethumb_" + id).attr("data-rotate-y", roty);
                $("#slidethumb_" + id).attr("data-rotate", value);
                $("#slidethumb_" + id).attr("data-transform-string", str);
            },
            rotateElementX: function(value)
            {
                rot = me.selectedOrchElement.attr("data-rotate");
                roty = me.selectedOrchElement.attr("data-rotate-y");
                s = "";
                if (rot != undefined)
                {
                    console.log("rotated already", rot);
                    s += "rotate(" + rot + "deg)";
                }
                if (roty != undefined)
                {
                    s += "rotateY(" + roty + "deg)";
                }
                str = s + " rotateX(" + value + "deg)";
                console.log("Transform string before writing", str);
                me.selectedOrchElement.css("transform", str);
                me.selectedOrchElement.attr("data-rotate", value);
                console.log("css", me.selectedOrchElement.css("transform"));
                me.selectedOrchElement.attr("data-rotate-x", value);
                id = me.selectedOrchElement.attr("id").split("_")[1];
                console.log("Updating slidethumb", $("#slidethumb_" + id));
                $("#slidethumb_" + id).attr("data-rotate-x", value);
                $("#slidethumb_" + id).attr("data-rotate-y", roty);
                $("#slidethumb_" + id).attr("data-rotate", rot);
                $("#slidethumb_" + id).attr("data-transform-string", str);
            },
            rotateElementY: function(value)
            {
                rot = me.selectedOrchElement.attr("data-rotate");
                rotx = me.selectedOrchElement.attr("data-rotate-x");
                s = "";
                if (rot != undefined)
                {
                    console.log("rotated already", rot);
                    s += "rotate(" + rot + "deg)";
                }
                if (rotx != undefined)
                {
                    s += "rotateX(" + rotx + "deg)";
                }
                str = s + " rotateY(" + value + "deg)";
                console.log("Transform string before writing y", str);
                me.selectedOrchElement.css("transform", str);
                me.selectedOrchElement.attr("data-rotate", value);
                console.log("css", me.selectedOrchElement.css("transform"));
                me.selectedOrchElement.attr("data-rotate-y", value);
                id = me.selectedOrchElement.attr("id").split("_")[1];
                console.log("Updating slidethumb", $("#slidethumb_" + id));
                $("#slidethumb_" + id).attr("data-rotate-x", rotx);
                $("#slidethumb_" + id).attr("data-rotate-y", value);
                $("#slidethumb_" + id).attr("data-rotate", rot);
                $("#slidethumb_" + id).attr("data-transform-string", str);
            },
            setupPopover: function()
            {
                $(".slidelement").popover({html: "hello world", placement: "bottom", trigger: "click"});
            },
            enableDrag: function()
            {
//                $(".slidelement").off(); //Delete all events before add again
//                $(".slidelement").resizable({
//                    handles: {
//                        'nw': '#play .ui-resizable-nw',
//                        'ne': '#play .ui-resizable-ne',
//                        'sw': '#play .ui-resizable-sw',
//                        'se': '#play .ui-resizable-se',
//                        'n': '#play .ui-resizable-n',
//                        'e': '#play .ui-resizable-e',
//                        's': '#play .ui-resizable-s',
//                        'w': '#play .ui-resizable-w'
//                    }
//                });

                $(".slidelement").draggable().on("dblclick", function(e)
                {
                    $(this).removeClass("grabbing");
                    if ($(this).attr("data-type") !== "image") {
                        me.editElement(this);
                    }
                }).on("click", function(e)
                {
                    me.selectCurrentClicked($(this));
                    e.stopPropagation();
                    me.selectElement(this);
                    me.updateScaledSlide(me.selectedSlide);
                    if ($(this).hasClass("elementediting")) {
                        launchEvent("click", $(".etch-editor-panel")[0]); //For close color picker
                    }
                }).on("mousedown", function(e)
                {
                    me.selectElement(this);
                    if (!($(this).attr("contentEditable") == "true")) {
                        $(this).removeClass("movecursor");
                        $(this).addClass("grabbing");
                    }
                }).on("mouseover", function(e)
                {
                    if (!($(this).attr("contentEditable") == "true")) {
                        $(this).addClass("movecursor");
                    }
                }).on("mouseup", function(e)
                {
                    if (!($(this).attr("contentEditable") == "true")) {
                        $(this).addClass("movecursor");
                    }
                }).keydown(function(e)//Default contenteditable undo/redo shortcuts disabled
                {
                    if ($(this).attr("contentEditable") == "true") {
                        if (isUndo(e)) {
                            e.preventDefault();
                        }
                        else {
                            if (isRedo(e)) {
                                e.preventDefault();
                            }
                            else {
                                if (e.ctrlKey) {
                                    if (e.ctrlKey && e.altKey && (e.which != "18" && e.which != "17" && e.which != "16")) { //Alt gr + key
                                        changeContent();
                                    }
                                    else {
                                    }
                                }
                                else {
                                    if (e.altKey && e.which == "18" || e.shiftKey && e.which == "16") { // Only alt or only shift
                                        //nothing
                                    }
                                    else {
                                        changeContent();
                                    }
                                }
                            }
                        }
                    }
                }).on("drag", function(e)
                {
                    if (me.isSelected(this)) {
                        scalePlay(this);
                    }
                    drawElement(this);
                    me.updateScaledSlide(me.selectedSlide);
                }).on('dragstop', function() {
                    var maxwidth = calculateMaxWidth(this, $(".fullslider-slide-container"));
                    var maxheight = calculateMaxHeight(this, $(".fullslider-slide-container"));
                    $(this).css("max-width", maxwidth + "vw");
                    $(this).css("max-height", maxheight + "vw");
                    drawElement(this);
//                        me.selectElement(this);
                    $(this).removeClass("grabbing");
                    changeContent();//Event for undo redo
                }).on('blur keyup paste input', function() {
                    if ($(this).attr("contentEditable")) {
                        var mw = parseInt($(this).css("max-width").replace(/[^-\d\.]/g, ''));
                        var mh = parseInt($(this).css("max-height").replace(/[^-\d\.]/g, ''));
                        var left = $(this).css("left").replace(/[^-\d\.]/g, '');
                        var top = $(this).css("top").replace(/[^-\d\.]/g, '');
                        var continue_drecreasing = true;
                        while (continue_drecreasing && this.scrollWidth >= mw && this.scrollHeight >= mh) {
                            if (left > 0 && me.boundTextOption === "bothradio") {
                                left -= 4;
                                $(this).css("left", pxToVw(left) + "vw");

                                mw = calculateMaxWidth(this, $(".fullslider-slide-container"));
                                mh = calculateMaxHeight(this, $(".fullslider-slide-container"));

                                $(this).css("max-width", mw + "vw");
                                $(this).css("max-height", mh + "vw");

                                mw = vwToPx(mw);
                                mh = vwToPx(mh);
                            }
                            else {
                                if (top > 0 && (me.boundTextOption === "topradio" || (left <= 0 && me.boundTextOption === "bothradio"))) {
                                    top -= 4;
                                    $(this).css("top", pxToVw(top) + "vw");

                                    mw = calculateMaxWidth(this, $(".fullslider-slide-container"));
                                    mh = calculateMaxHeight(this, $(".fullslider-slide-container"));

                                    $(this).css("max-width", mw + "vw");
                                    $(this).css("max-height", mh + "vw");
                                    mw = vwToPx(mw);
                                    mh = vwToPx(mh);
                                }
                                else {
                                    continue_drecreasing = decreaseSize($(this));
                                }
                            }
                        }
                    }
                });
                //only can moves in slide
                $(function() {
                    $(".ui-draggable").draggable({autoscroll: false, containment: ".fullslider-slide-container", scroll: false});
                });
            },
            positionTransformControl: function()
            {
                _transform = me.selectedElement.css("-webkit-transform");
                $("#play").css("-webkit-transform", _transform);
                $("#play").css("display", "block");
                scalePlay(me.selectedElement[0]);
                $("#spandelete").off();//restore
                $("#spandelete").on("click", function(e)
                {
                    e.stopPropagation();
                    me.deleteElement(me.selectedElement);
                    changeContent();//Event for undo redo
                });
            },
            selectElement: function(el)
            {
                console.log("click firing....");
                // if not is in editionmode, select it
                if ($(el).attr("contentEditable") == "false" || typeof ($(el).attr("contentEditable")) == "undefined") {
                    me.clearElementSelections();
                    me.selectedElement = $(el);
                    $(el).addClass("elementselected");
                    $(el).attr("data-select", true);
                    me.positionTransformControl();
                }
            },
            isSelected: function(element) {
                return (element.getAttribute("data-select"));
            },
            editElement: function(el) {
                me.clearElementSelections();
                me.selectedforedit = el;
                $(el).draggable({disabled: true});
                $(el).addClass("elementediting");
                $(el).removeClass("movecursor");
                $(el).removeClass("elementselectable");
            },
            deleteElement: function(el) {
                el.remove();
                me.updateScaledSlide(me.selectedSlide);
                $("#play").css("display", "none");
            },
            addElemOnAllSlides: function(el) {
                $(".fullslider-slide-container").find(".fullslider-slide").each(function() {
                    $(this).append(me.clonePatternElement(el));
                    me.updateScaledSlide($(this));
                });
            },
            setupColorpickerPopup: function()
            {
                var $colorChooser = $(document).find(".color-chooser");
                if ($colorChooser.length > 0) {
                    var hex = '333';
                    $colorChooser.spectrum({
                        color: '#' + hex,
                        preferredFormat: "hex",
                        showSelectionPalette: true,
                        showPalette: true,
                        showInitial: true,
                        showInput: true,
                        cancelText: '<i class="fa fa-remove"></i>',
                        chooseText: '<i class="fa fa-check"></i>',
                        palette: [],
                        clickoutFiresChange: false,
                        theme: 'sp-dark',
                        change: function(color) {
                            document.execCommand('foreColor', false, color.toHexString());
                            Backbone.trigger('etch:state', {
                                color: color.toHexString()
                            });
                            changeContent();//Event for undo redo
                        }
                    });
                    var prevent = function(e) {
                        e.preventDefault();
                    };
                    var replacer = $("#tools").find(".sp-replacer");
                    replacer.html('<i class="fa fa-tint"></i>');
                    replacer.addClass("btn btn-info menubtn");
                    replacer.removeClass("sp-replacer sp-dark");
                    $(".sp-replacer").mousedown(prevent);
                    $(".sp-container").mousedown(prevent);
                    $colorChooser.mousedown(prevent);
                    $colorChooser.find("div").css("backgroundColor", '#' + hex);
                }
            },
            addSettingsPanel: function(type)
            {
                if (!me.currentPresentation) {
                    me.createNewPresentation();
                }
            },
            manageGlobalClick: function(e)
            {
                me.updateScaledSlide(me.selectedSlide);
                var t = $(e.target);
                if (t.not('.etch-editor-panel, .etch-editor-panel *, .etch-image-tools, .etch-image-tools *, .elementediting, .elementediting *,.sp-container *, .colorpicker *, #colorpickerbtn, #textToolsm, #textTools *, .contextmenu-textEditing *').size() && !($("#addElementsPanel").find(t).length)) {
                    me.clearElementSelections();
                }

                me.selectCurrentClicked(t);
            },
            selectCurrentClicked: function(el) {
                if (me.currentClicked !== "" && !isInElement($(".context-menu-list"), el)) {
                    me.currentClicked.removeClass("currentClicked");
                    me.currentClicked = "";
                }
                var toSave = "";
                if (isInElement($(".slidethumbholder"), el)) {
                    toSave = el;
                    if (isInElement($(".slidethumb"), el) && el.attr("id") !== "deletebtn") {
                        if (!el.hasClass("slidethumb")) {
                            toSave = el.parent();
                        }
                    }
                    toSave.addClass("currentClicked");
                }
                else {
                    if (isElementByClass("slidelement", el)) {
                        toSave = el;
                        toSave.addClass("currentClicked");
                    }
                    else {
                        if (isElementByClass("fullslider-slide", el)) {
                            toSave = el;
                            toSave.addClass("currentClicked");
                        }
                    }
                }
                me.currentClicked = toSave;
            },
            clearElementSelections: function()
            {
                $("#play").css("display", "none");
                $(".slidelement").removeClass("elementhover");
                $(".slidelement").removeClass("elementselected");
                $(".slidelement").removeClass("elementediting");
                $(".slidelement").addClass("elementselectable");
                $(".slidelement").draggable({disabled: false});
                $(".slidelement").attr("data-select", false);
                $(".slidelement").attr("contentEditable", "false");
                me.selectedElement = "";
                me.selectedforedit = "";
            },
            colorSelectedElement: function(color)
            {
                if (me.selectedElement)
                {
                    me.selectedElement.css("color", color);
                }

            },
            addSlide: function()
            {
                thumb = slidethumb;
                uid = me.generateUID();
                thumb = thumb.split("slidethumb_^UID^").join("slidethumb_" + uid);
                $(".slidethumbholder").append(thumb);
                $("#slidethumb_" + uid).animate({opacity: 1}, 200);
                //$("#slidethumb_" + uid).attr("data-left", me.lastslideleftpos + "px");
                //$("#slidethumb_" + uid).attr("data-top", "0px");
                me.addSlideEvents();
                me.lastslideleftpos += 200;
                me.assignSlideNumbers();
                me.addFullsliderSlide(uid);
                $("#presentationmetatitle").html($("#titleinput").val());
                changeContent();//Event for undo redo
            },
            addSlideEvents: function()
            {
                $(".deletebtn").on("click", function(e)
                {
                    p = $("#" + $(this).attr("data-parent"));
                    slideid = $(this).attr("data-parent").split("_")[1];
                    var index = $("#slidethumb_" + slideid).index();
                    console.log("parent", p, slideid);
                    p.animate({opacity: 0}, 200, function(e)
                    {
                        $(this).remove();
                        $("#fullslider_slide_" + slideid).remove();
                        me.assignSlideNumbers();
                        var children = $(".slidethumbholder").children();
                        var newslideid;
                        if (children[index]) {
                            newslideid = $(children[index]).attr("id");
                        }
                        else {
                            newslideid = $(children[index - 1]).attr("id");
                        }
                        newslideid = newslideid.split("_")[1];
                        me.selectSlide("#fullslider_slide_" + newslideid);
                        me.selectThumb(newslideid);
                    });
                    changeContent();//Event for undo redo
                });
                $(".slidemask").on("click", function(e)
                {
//                    e.stopPropagation();
                    id = (e.target.id).split("_")[1];
                    console.log("slidemask", id);
                    me.selectSlide("#fullslider_slide_" + id);
                    me.selectThumb(id);
                    me.hideTransformControl();
                });
            },
            addFullsliderSlide: function(id)
            {
                islide = fullslider_slide;
                islide = islide.split("__slidenumber__").join("_" + id);
                $(".fullslider-slide-container").append(islide);
                $("#fullslider_slide_" + id).addClass("fullslider-slide-element");
                //$("#fullslider_slide_"+id).addClass(me.theme);
                me.selectSlide("#fullslider_slide_" + id);
                me.selectThumb(id);
                me.addFullsliderText("normal");
                for (var i in me.patterns) {
                    $(me.selectedSlide).append(me.clonePatternElement(me.patterns[i]));
                }
                me.generateScaledSlide(me.selectedSlide);
            },
            addFullsliderSlideItem: function()
            {
                console.log("adding the new item....");
                item = text_snippet;
                var id = "slidelement_" + me.generateUID();
                item = item.split("slidelement_id").join(id);
                $(me.selectedSlide).append(item);
                return (document.getElementById(id));
            },
            addFullsliderText: function(type) {
                var element = me.addFullsliderSlideItem();
                me.addTextStyle(element, type);
                me.enableDrag();
                me.selectedelement = element;
                me.generateScaledSlide(me.selectedSlide);
            },
            addTextStyle: function(element, type) {
                var size = "";
                var font = "";
                var color = "";
                switch (type) {
                    case "normal":
                        size = me.normalSize;
                        color = me.normalColor;
                        font = me.normalFont;
                        break;
                    case "title":
                        size = me.titleSize;
                        color = me.titleColor;
                        font = me.titleFont;
                        break;
                    case "subtitle":
                        size = me.subtitleSize;
                        color = me.subtitleColor;
                        font = me.subtitleFont;
                        break;
                    default:
                        size = "1.75vw";
                        color = "#000";
                        font = "'Montserrat', sans-serif";
                        break;
                }

                $(element).css("font-size", size + "vw");
                var text_value = $(element).text();
                $(element).children().html("<font color='" + color + "'>" + text_value + "</font>");
                $(element).css("font-family", font);


                $(element).css("position", "absolute");
                $(element).css("left", "24.6vw");
                $(element).css("top", "5.66vw");
                $(element).css("line-height", "initial", "important");
                //$(element).css("color", "#000");
                $(element).css("height", "initial");
                $(element).css("width", "auto");
                $(element).css("white-space", "normal");
                var maxwidth = calculateMaxWidth(element, $(".fullslider-slide-container"));
                var maxheight = calculateMaxHeight(element, $(".fullslider-slide-container"));
                $(element).css("max-width", maxwidth + "vw");
                $(element).css("max-height", maxheight + "vw");
                $(element).css("overflow", "hidden");
                $(element).css("word-break", "break-word", "important");
            },
            addDataSelectable: function(element) {
                element.setAttribute("data-select", true);
                me.selectElement(element);
            },
            generateScaledSlide: function(el)
            {
                tempel = el;
                newel = $(el).clone();
                try
                {
                    id = newel.attr("id").split("_")[2];
                }
                catch (e)
                {
                    //error.
                }
                //$("clonethumb_"+id).remove();
                newel.attr("id", "clonethumb_" + id);
                newel.attr("data-clone", true);
                newel.css("transform", "scale(0.17, 0.197)");
                newel.css("-webkit-transform", "scale(0.17, 0.197)"); /* Safari and Chrome */
                newel.css("-moz-transform", "scale(0.17, 0.197)"); /* Firefox */
                newel.css("-ms-transform", "scale(0.17, 0.197)"); /* IE 9 */
                newel.css("-o-transform", "scale(0.17, 0.197)"); /* Opera */

                newel.removeClass("fullslider-slide-element");
                //newel.css("border", "1px solid #999");
                newel.css("left", "-25vw");
                newel.css("top", "-15.48vw");
                newel.css("width", "60.1896vw");
                newel.css("height", "38.653vw");
                children = $("#slidethumb_" + id).children();
                for (var i = 0; i < children.length; i++)
                {

                    child = children[i];
                    if ($(child).attr("data-clone") == "true")
                    {
                        $(child).remove();
                    }
                }

                $("#slidethumb_" + id).append(newel);
                //$(".orchestrationviewport").append( orchel );
                //$(".fullslider-slide").append( newel );


            },
            updateScaledSlide: function(el)
            {
                var id = el.attr("id").split("_")[2];
                var section = $("#slidethumb_" + id + " > section");
                section.html(el.html());
            },
            selectSlide: function(id)
            {
                children = $(".fullslider-slide-container").children();
                //console.log("I am in selection", children)
                for (var i = 0; i < children.length; i++)
                {
                    child = children[i];
                    childid = "#" + child.id;
                    if (childid == id)
                    {
                        //console.log("found", childid);
                        $(childid).css("z-index", 1);
                        me.selectedSlide = $(childid);
                    }
                    else
                    {
                        console.log("did not find", childid);
                        $(childid).css("z-index", -200 + (-(Math.round(Math.random() * 1000))));
                    }
                }
            },
            selectThumb: function(id)
            {
                $(".slidethumb").removeClass("currentselection");
                $("#slidethumb_" + id).addClass("currentselection");
            },
            assignSlideNumbers: function()
            {
                children = $(".slidethumbholder").children();
                //console.log("children", children);
                for (var i = 0; i < children.length; i++)
                {
                    child = $(children[i]);
                    count = i;
                    //console.log("child", $("#"+child[0].id).find(".slidedisplay").html())
                    $("#" + child[0].id).find(".slidedisplay").html("Slide " + (++count));
                    //slidenumber = $("#"+child[0].id).find(".slidedisplay").html();
                    //child.innerText = child.innerText.split("__text__").join("Slide "+(++count));
                }
            },
            generateUID: function()
            {
                return Math.round(Math.random() * 10000);
            },
            animateSettingsPanel: function(direction)
            {
                if (direction == "left")
                {
                    $(".settingsbox").animate({"left": "-500px", "opacity": 0}, {duration: 300, easing: "linear"});
                    me.menuopen = false;
                }
                if (direction == "right")
                {
                    $(".settingsbox").animate({"left": "230px", "opacity": 1}, {duration: 300, easing: "linear"});
                    me.menuopen = true;
                }
            },
            animatePanel: function(panel, amount)
            {
                $(".maskedcontainer").animate({"top": amount, "opacity": 1}, {duration: 300, easing: "linear"});
            },
            attachListeners: function() //On add event, add the same with off in removeListeners
            {
                $("html").on("click", me.manageGlobalClick);
                $(".settingsCancelBtn").on("click", me.onSettingsCancelClicked);
                $(".menuItemBtn").on("click", me.onMenuItemClicked);
                $(".slidelement").on("click", me.triggetElementEdit);
                $(".slidelement").on("mouseup", me.createEditor);
                $("#newstylepanel").on("click", me.openStyleSelector);
                $("#exportpresopanel").on("click", me.openCodeExportWindow);
                $("#editpresonamebtn").on("click", function(e)
                {
                    $("#newpresentationmodal").removeClass("hide");
                    $("#newpresentationmodal").modal("show");
                    $("#newpresoheader").html("Save Presentation As");
                    $("#titleinput").val($("#presentationmetatitle").text());
                    me.mode = "save";
                });
                $(".previewpresobtn").on("click", function(e)
                {
                    console.log("data parent id", $(this).attr("data-id"));
                    me.fetchAndPreview($(this).attr("data-id"));
                });
                $("#saveconfiguration").on("click", function(e)
                {
                    me.updateConfig();
                    $(".modal").modal("hide");
                });
                $("#closeconfiguration").on("click", function(e) {
                    me.loadConfig();
                });
                $(".fontconfig li a").on("click", function(e) {
                    var value = extractValue(e);

                    var selected_font_link = $(e.target).closest("div").children("a");
                    selected_font_link.attr("data-font", value);

                    var value_name = get_font_name(value);

                    //update value on editor button
                    selected_font_link.find(".fontFamilySelected").html(value_name);
                });
                $(".createpresentation").on("click", function(e)
                {

                    console.log("Mode", me.mode);
                    if (me.mode == "create")
                    {
                        me.createNewPresentation();
                    }
                    else
                    {
                        console.log("saving now");
                        $("#presentationmetatitle").html($("#titleinput").val());
                        me.currentPresentation.title = $("#titleinput").val();
                        me.savePresentation();
                    }
                    $(".modal").modal("hide");
                });
                $("#savepresentationbtn").on("click", function(e)
                {
                    if (me.currentPresentation)
                    {
                        console.log("Has access to current presentation");
                        me.clearElementSelections();
                        $("#titleinput").val(me.currentPresentation.title);
                    }
//                    $("#newpresentationmodal").removeClass("hide");
//                    $("#newpresentationmodal").modal("show");
                    me.mode = "save";
                    me.savePresentation();
                });
                $(".dropdownitem").on("click", function(e)
                {
                    console.log("Dd value: ", $(e.target).attr("data-dk-dropdown-value"));
                    me.changeTextFormat($(e.target).attr("data-dk-dropdown-value"));
                    $(".dropdownpopup").css("display", "block");
                    $(".pulldownmenu").html($(e.target).html());
                    //$(".dropdownpopup").css("display", "none");
                    me.dropdownopen = true;
                    me.hideTransformControl();
                });

                //Add Text buttons on click. 
                $("#addtextbtn,#normalTextBtn").on("click", function(e)
                {
                    me.addFullsliderText("normal");

                    changeContent();//Event for undo redo
                    //On create text element, this is selected with click event
                    launchEvent("click", me.selectedforedit);
                });
                $("#titleTextBtn").on("click", function(e)
                {
                    me.addFullsliderText("title");

                    changeContent();//Event for undo redo
                    //On create text element, this is selected with click event
                    launchEvent("click", me.selectedforedit);
                });
                $("#subtTextBtn").on("click", function(e)
                {
                    me.addFullsliderText("subtitle");
                    changeContent();//Event for undo redo
                    //On create text element, this is selected with click event
                    launchEvent("click", me.selectedforedit);
                });
                //End add text buttons on click

                $("#addimagebtn").on("click", function(e)
                {
                    console.log("open image modal...");
                    $("#imagemodal").removeClass("hide");
                    $("#imagemodal").modal("show");
                    $("#imageinput").focus();
                });
                $(".newpresopanel").on("click", function(e)
                {
                    $(".modal").modal("hide");
                    console.log("open image modal...");
                    $("#newpresentationmodal").removeClass("hide");
                    $("#newpresentationmodal").modal("show");
                    $("#titleinput").val("New Presentation");
                    $("#newpresoheader").html("Create New Presentation");
                    me.mode = "create";
                });
                $("#imageinput").on("blur keyup", function(e)
                {
                    image = $(this).val();
                    $("#previewimg").attr("src", image);
                });
                $("#addslidebtn").on("click", function(e)
                {
                    me.addSlide();
                });
                $("#appendimagebtn").on("click", function(e)
                {
                    console.log("append image to stage");
                    image = $("#previewimg").attr("src");
                    me.addImageToSlide(image);
                    $("#imagemodal").modal("hide");
                });
                $("#openpresentationsbtn").on("click", function(e)
                {
                    $(".previewpresobtn").on("click", function(e)
                    {
                        console.log("data parent id", $(this).attr("data-id"));
                        me.fetchAndPreview($(this).attr("data-id"));
                    });
                    $(".openpresobtn").on("click", function(e)
                    {
                        console.log("Edit presentation");
                        me.mode = "save";
                        me.openPresentationForEdit($(this).attr("data-id"));
                    });
                    $("#savedpresentationsmodal").removeClass("hide");
                    $("#savedpresentationsmodal").modal("show");
                });
                $("#openconfiguration").on("click", function(e)
                {
                    $("#configmodal").removeClass("hide");
                    $("#configmodal").modal("show");
                });
                $("#viewbtn").on("click", function(e)
                {
                    var slides = me.generateExportMarkup();
                    me.generatePreview(slides);
                });
                $("#downloadpresbtn").on("mouseover", function(e)
                {
                    me.downloadFile(me.generateFile(), me.getFileName());
                });
                $(".loadpresbtn").on("click", function(e)
                {
                    $("#inputFile").click();
                });
                $('#inputFile').change(function(e) {
                    $(".loadpresbtn").button('loading');
                    var files = e.target.files;
                    var error = false;
                    if (!(/\.fspf$/).test(files[0].name)) {
                        var msg = "File extension is not supported. Fullslider only supports '.fspf' files.";
                        openAlert("danger", msg);
                        error = true;
                        $('input[name=openFile]').removeAttr('value');
                        $(".loadpresbtn").button('reset');
                    }
                    else {
                        var reader = new FileReader();
                        reader.addEventListener("loadend", function() {

                            var presentation;
                            try {
                                presentation = JSON.parse(reader.result);
                                if (!me.existPresentation(presentation.id)) {
                                    me.mypresentations.push(presentation);
                                }
                                error = me.isFileCorrupted(presentation);
                                if (error) {
                                    var msg = "Could not open the file. File is corrupted.";
                                    openAlert("danger", msg);
                                }
                                else {
                                    me.loadPresentation(presentation);
                                    var msg = "File has been loaded succesfully!";
                                    openAlert("success", msg);
                                    initializeUndoRedo();
                                    $("#welcomemodal").modal("hide");
                                }
                                $('input[name=openFile]').removeAttr('value');
                                $(".loadpresbtn").button('reset');
                            }
                            catch (e) {
                                var msg = "Could not open the file. File is corrupted.";
                                openAlert("danger", msg);
                            }
                        });
                        reader.readAsText(files[0]);
                        if (reader.readyState == 1) {
                            $(".loadpresbtn").button('reset');
                        }
                    }

                });


                $(window).resize(function(e) {
                    if ((me.selectedforedit !== "") && ($("#welcomemodal").css("display") == "none")) {
                        launchEvent("dblclick", me.selectedforedit);
                    }
                    if (me.selectedElement !== "") {
                        scalePlay(me.selectedElement[0]);
                    }
                    else {

                    }
                });
            },
            removelisteners: function()
            {
                $(".settingsCancelBtn").off();
                $(".viewtogglebtn").off();


                $("html").off();
                $(".settingsCancelBtn").off();
                $(".menuItemBtn").off();
                $(".slidelement").off();
                $(".slidelement").off();
                $("#newstylepanel").off();
                $("#exportpresopanel").off();
                $("#editpresonamebtn").off();
                $(".previewpresobtn").off();
                $("#saveconfiguration").off();
                $("#closeconfiguration").off();
                $(".fontconfig li a").off();
                $(".createpresentation").off();
                $("#savepresentationbtn").off();
                $(".dropdownitem").off();

                //Add Text buttons on click. 
                $("#addtextbtn,#normalTextBtn").off();
                $("#titleTextBtn").off();
                $("#subtTextBtn").off();
                //End add text buttons on click

                $("#addimagebtn").off();
                $(".newpresopanel").off();
                $("#imageinput").off();
                $("#addslidebtn").off();
                $("#appendimagebtn").off();
                $("#openpresentationsbtn").off();
                $("#openconfiguration").off();
                $("#viewbtn").off();
                $("#downloadpresbtn").off();
                $(".loadpresbtn").off();
                $('#inputFile').off();
            },
            openStyleSelector: function()
            {
                $("#styleselectionmodal").modal("show");
            },
            deleteSavedPresentation: function(id)
            {
                var presentations = JSON.parse(me.getItem(me.saveKey));
                var presentation;
                for (var i = 0; i < presentations.length; i++)
                {
                    presentation = presentations[i];
                    if (id == presentation.id)
                    {
                        presentations.splice(i, 1);
                        break;
                    }
                }
                console.log("after delete", presentations);
                me.saveItem(me.saveKey, JSON.stringify(presentations));
                var lastsaved = JSON.parse(me.getItem(me.lastSaved));
                if ((lastsaved !== null) && lastsaved.id == id)
                {
                    console.log("lastsaved", lastsaved.id);
                    localStorage.removeItem(me.lastSaved);
                }
                presentations = me.getSavedPresentations();
                me.renderPresentations(presentations);
            },
            generateExportMarkup: function()
            {
                var children = $(".slidethumbholder").children();
//                var count = 0;
                for (var i = 0; i < children.length; i++)
                {
                    var child = $(children[i]);
                    var id = child.attr("id").split("_")[1];
//                    var l = count;
//                    count += 200;
//                    var t = child.attr("data-top").split("px")[0];

//                    var coords = me.calculateSlideCoordinates(l, t);
                    var el = $("#fullslider_slide_" + id);
//                    el.attr("data-x", coords.x - 500);
//                    el.attr("data-y", coords.y);
//                    el.attr("data-rotate", child.attr("data-rotate"));
//                    el.attr("data-rotate-x", child.attr("data-rotate-x"));
//                    el.attr("data-rotate-y", child.attr("data-rotate-y"));
//                    el.attr("data-z", child.attr("data-z"));
//                    el.attr("data-scale", child.attr("data-scale"));
//                    el.addClass("step");
                }
                var outputcontainer = $(".fullslider-slide-container").clone();
                console.log("output", $(".fullslider-slide-container").html().toString());
                outputcontainer.find(".fullslider-slide").each(function(i, object)
                {
                    console.log("Physically adding sizing information");
                });
                return (outputcontainer.html().toString());
            },
            cleanFullslider: function() {
                $(".slidethumbholder").html("");
                $(".fullslider-slide-container").html("");
            },
            createNewPresentation: function()
            {
                //Delete slides and slidethumbs
                me.cleanFullslider();

                //Load default text configuration
                me.loadTextDefault();
                me.loadConfig();

                var config = me.getConfigVariable();

                //add new slide
                me.addSlide();
                var presentation = {
                    id: Math.round(Math.random() * 201020),
                    title: $("#presentationmetatitle").text(),
                    contents: $(".fullslider-slide-container").html().toString(),
                    config: config

                };
                me.currentPresentation = presentation;
                initializeUndoRedo();
            },
            openPresentationForEdit: function(id)
            {
                console.log("id", id);
                for (var i = 0; i < me.mypresentations.length; i++)
                {
                    var presentation = me.mypresentations[i];
                    if (id == presentation.id)
                    {
                        me.loadPresentation(presentation);
                    }
                    $("#savedpresentationsmodal").modal("hide");
                }
                initializeUndoRedo();
            },
            isFileCorrupted: function(presentation) {
                var id = (presentation.id === undefined || presentation.id === null);
                var title = (presentation.title === undefined || presentation.title === null);
                var contents = (presentation.contents === undefined || presentation.contents === null);
                var config = (presentation.config === undefined || presentation.config === null);

                var normalText = (presentation.config.normalText === undefined || presentation.config.normalText === null);
                var normalTextSize = (presentation.config.normalText.size === undefined || presentation.config.normalText.size === null);
                var normalTextFont = (presentation.config.normalText.font === undefined || presentation.config.normalText.font === null);
                var normalTextColor = (presentation.config.normalText.color === undefined || presentation.config.normalText.color === null);

                var titleText = (presentation.config.titleText === undefined || presentation.config.titleText === null);
                var titleTextSize = (presentation.config.titleText.size === undefined || presentation.config.titleText.size === null);
                var titleTextFont = (presentation.config.titleText.font === undefined || presentation.config.titleText.font === null);
                var titleTextColor = (presentation.config.titleText.color === undefined || presentation.config.titleText.color === null);

                var subtText = (presentation.config.subtText === undefined || presentation.config.subtText === null);
                var subtTextSize = (presentation.config.subtText.size === undefined || presentation.config.subtText.size === null);
                var subtTextFont = (presentation.config.subtText.font === undefined || presentation.config.subtText.font === null);
                var subtTextColor = (presentation.config.subtText.color === undefined || presentation.config.subtText.color === null);

                var boundTextOption = (presentation.config.boundTextOption === undefined || presentation.config.boundTextOption === null);

                var error = (id || title || contents || config || normalText || normalTextSize || normalTextFont || normalTextColor || titleText ||
                        titleTextSize || titleTextFont || titleTextColor || subtText || subtTextSize || subtTextFont || subtTextColor || boundTextOption);
                return error;
            },
            fetchAndPreview: function(id)
            {
                for (var i = 0; i < me.mypresentations.length; i++)
                {
                    presentation = me.mypresentations[i];
                    if (id == presentation.id)
                    {
                        console.log("content", presentation.contents);
                        $(".placeholder").html(presentation.contents);
                        $(".placeholder").find(".fullslider-slide").each(function(i, object)
                        {
                            console.log("Physically adding sizing information, again");
                            $(this).css("width", "1024px");
                            $(this).css("height", "768px");
                            $(this).addClass("step");
                        });
                        me.generatePreview($(".placeholder").html().toString());
                        $("#savedpresentationsmodal").modal("hide");
                        break;
                    }
                }
            },
            getFileName: function() {
                var title = me.getTitle();
                title = title.replace(/\s+/g, '_');
                return title;
            },
            getTitle: function() {
                return ($("#presentationmetatitle").text());
            },
            savePresentation: function()
            {
                $("#savepresentationbtn").text("Saving...");
                var item = me.getItem(me.saveKey);
                var arr;
                if (item)
                {
                    arr = JSON.parse(item);
                    if (this.mode == "save")
                    {
                        if (me.currentPresentation)
                        {
                            arr = me.removeReference(arr);
                        }

                    }

                }
                else
                {
                    arr = [];
                }
                var tempid;
                if (this.mode == "save")
                {
                    if (me.currentPresentation)
                    {
                        tempid = me.currentPresentation.id;
                    }
                    else
                    {
                        tempid = Math.round(Math.random() * 201020);
                    }

                }
                else
                {
                    tempid = Math.round(Math.random() * 201020);
                }

                var config = me.getConfigVariable();

                var o = {
                    id: tempid,
                    title: $("#presentationmetatitle").text(),
                    contents: $(".fullslider-slide-container").html().toString(),
                    config: config
                };
                me.currentPresentation = o;
                $("#presentationmetatitle").html(me.currentPresentation.title);
                arr.push(o);
                me.saveItem(me.saveKey, JSON.stringify(arr));
                me.saveItem(me.lastSaved, JSON.stringify(o));
                presentations = me.getSavedPresentations();
                presentations.reverse();
                me.renderPresentations(presentations);
                $(".previewpresobtn").on("click", function(e)
                {
                    console.log("data parent id", $(this).attr("data-id"));
                    me.fetchAndPreview($(this).attr("data-id"));
                });
                $(".modal").modal("hide");
                setTimeout(me.resetSaveButtonText, 1000);
            },
            resetSaveButtonText: function()
            {
                $("#savepresentationbtn").html('<i class="glyphicon glyphicon-ok-sign"></i>&nbsp;Save');
            },
            generateFile: function() {
                var title = me.getTitle();
                var contents = me.generateExportMarkup();
                var id = me.currentPresentation.id;
                var config = me.getConfigVariable();

                var file = {
                    'id': id,
                    'title': title,
                    'contents': contents,
                    'config': config
                };
                var text = JSON.stringify(file);
                var blob = new Blob([text], {type: "application/json"});
                return blob;
            },
            downloadFile: function(content, filename) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    var save = document.getElementById("downloadpresbtn");
                    save.setAttribute("href", event.target.result);
                    save.setAttribute("target", '_blank');
                    save.setAttribute("download", (filename + ".fspf") || (me.generateUID() + '.fspf'));
                    (window.URL || window.webkitURL).revokeObjectURL(save.href);
                };
                reader.readAsDataURL(content);
            },
            generateAllThumbs: function() {
                $(".slidethumbholder").html("");
                var thumb;
                var uid;
                $(".fullslider-slide").each(function(i, object)
                {
                    thumb = slidethumb;
                    uid = $(this).attr("id").replace("fullslider_slide_", "");
                    thumb = thumb.split("slidethumb_^UID^").join("slidethumb_" + uid);
                    $(".slidethumbholder").append(thumb);
                    $("#slidethumb_" + uid).animate({opacity: 1}, 200);
                    me.addSlideEvents();
                    me.lastslideleftpos += 200;
                    me.assignSlideNumbers();
                    me.selectSlide("#fullslider_slide_" + uid);
                    me.generateScaledSlide(me.selectedSlide);
                });

            },
            loadPresentation: function(presentation) {
                me.cleanFullslider();

                $(".fullslider-slide-container").html(presentation.contents);
                me.generateAllThumbs();

                var first_slide_id = $(".fullslider-slide-container").find(".fullslider-slide-element").attr("id");
                first_slide_id = first_slide_id.replace(/[^-\d\.]/g, '');
                me.selectSlide("#fullslider_slide_" + first_slide_id);
                me.selectThumb(first_slide_id);
                me.currentPresentation = presentation;
                $("#presentationmetatitle").html(me.currentPresentation.title);
                console.log("rendered");
                $("#savedpresentationsmodal").modal("hide");
                me.enableDrag();
                me.mode = "save";

                //Load design configuration
                me.updateConfigFromSaved(presentation.config);
                me.loadConfig();

                me.savePresentation();
            },
            existPresentation: function(id) {
                var exist = false;
                var i = 0;
                var presentation = null;
                while ((!exist) && (i < me.mypresentations.length))
                {
                    presentation = me.mypresentations[i];
                    if (id == presentation.id)
                    {
                        exist = true;
                    }
                    i++;
                }
                return exist;
            },
            removeReference: function(arr)
            {

                for (var i = 0; i < arr.length; i++)
                {
                    if (arr[i].id == me.currentPresentation.id)
                    {
                        arr.splice(i, 1);
                        break;
                    }
                }

                return arr;
            },
            getSavedPresentations: function()
            {
                var item = me.getItem(me.saveKey);
                arr = [];
                if (item)
                {
                    arr = JSON.parse(item);
                }
                return arr;
            },
            generatePreview: function(str)
            {
                sessionStorage.setItem('preview', str);
                sessionStorage.setItem('title', me.getTitle());
//                window.open("app/components/impress.js/index.html");
                window.open("app/components/reveal.js/index.html");
            },
            calculateSlideCoordinates: function(wx, wy)
            {
                var vx = Math.round(((me.vxmax - me.vxmin) / (me.wxmax - me.wxmin)) * (wx - me.wxmin) + me.vxmin);
                var vy = Math.round(((me.vymax - me.vymin) / (me.wymax - me.wymin)) * (wy - me.wymin) + me.vymin);
                var object = {x: vx, y: vy};
                console.log("object", object);
                return object;
            },
            addImageToSlide: function(src)
            {
                console.log("adding image", src);
                var img = new Image();
                var id = me.generateUID();
                $(img).attr("id", "slidelement_" + id);
                $(img).css("left", "15vw");
                $(img).css("top", "15vw");
                $(img).addClass("slidelement");
                $(img).attr("src", src);
                $(img).attr("data-type", "image");
                console.log("selectedslide", me.selectedSlide);
                me.selectedSlide.append($(img));
                var im_height = $("#slidelement_" + id)[0].offsetHeight;
                var im_width = $("#slidelement_" + id)[0].offsetWidth;
                var scale;
                if (im_height < im_width) {
                    scale = im_width / im_height;
                    im_height = 7;
                    im_width = 7 * scale;
                }
                else {
                    if (im_height > im_width) {
                        scale = im_height / im_width;
                        im_width = 7;
                        im_height = 7 * scale;
                    }
                    else {
                        im_height = 7;
                        im_width = 7;
                    }
                }

                $(img).css("height", im_height + "vw");
                $(img).css("width", im_width + "vw");
                me.enableDrag();
            },
            removeSlide: function(el)
            {
                el.remove();
                clearInterval(me.deleteslideinterval);
            },
            createEditor: function(e)
            {
                editor = $(e.target).clone();
                //editor.attr("contentEditable", "true");
            },
            triggetElementEdit: function(e)
            {
                //$(e.target).attr("contentEditable", true);
            },
            onSettingsCancelClicked: function(e)
            {
                console.log("clicked");
                me.animateSettingsPanel("left");
            },
            onMenuItemClicked: function(e)
            {
                $("#newpresentationmodal").removeClass("hide");
                $("#newpresentationmodal").modal("show");
                $("#newpresoheader").html("Create New Presentation");
                me.mode = "create";
            },
            calculateThumbnailCoords: function(wx,
                    wy,
                    vxmax,
                    vxmin,
                    vymax,
                    vymin,
                    wxmax,
                    wxmin,
                    wymax,
                    wymin
                    )
            {
                var vx = Math.round(((vxmax - vxmin) / (wxmax - wxmin)) * (wx - wxmin) + vxmin);
                var vy = Math.round(((vymax - vymin) / (wymax - wymin)) * (wy - wymin) + vymin);
                var object = {x: vx, y: vy};
                return object;
            },
            saveItem: function(key, value)
            {
                if (me.isSupported())
                {
                    localStorage.setItem(key, value);
                }

            },
            getItem: function(key)
            {
                if (me.isSupported()) {
                    return localStorage.getItem(key);
                }
            },
            slideIdFromThumb: function(thumb)
            {
                var uid = thumb.attr("id").replace("slidethumb_", "");
                return "fullslider_slide_" + uid;
            },
            thumbIdFromSlide: function(slide)
            {
                var uid = slide.attr("id").replace("fullslider_slide_", "");
                return "slidethumb_" + uid;
            },
            isSupported: function()
            {
                if (localStorage)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            },
            getCurrentClicked: function() {
                return me.currentClicked;
            },
            getSelectedElement: function() {
                return me.selectedElement;
            },
            getSelectedForEdit: function() {
                return me.selectedforedit;
            },
            getClonedElement: function() {
                return me.clonedElement;
            },
            loadTextDefault: function() {
                me.normalSize = 1.75;
                me.titleSize = 3.5;
                me.subtitleSize = 2.75;

                me.normalFont = "'Montserrat', sans serif";
                me.titleFont = "'Montserrat', sans serif";
                me.subtitleFont = "'Montserrat', sans serif";

                me.normalColor = "#000";
                me.titleColor = "#000";
                me.subtitleColor = "#000";
            },
            loadConfig: function() {
                $("#normal_text_size").attr("value", me.normalSize);
                $("#title_text_size").attr("value", me.titleSize);
                $("#subt_text_size").attr("value", me.subtitleSize);

                me.loadFont("normal");
                me.loadFont("title");
                me.loadFont("subtitle");

                me.loadColor("normal");
                me.loadColor("title");
                me.loadColor("subtitle");
                $("#" + me.boundTextOption).prop("checked", true);
            },
            loadFont: function(type) {
                var value = "";
                var element_id = "";

                switch (type) {
                    case "normal":
                        value = me.normalFont;
                        element_id = "#normal_text_font";
                        break;
                    case "title":
                        value = me.titleFont;
                        element_id = "#title_text_font";
                        break;
                    case "subtitle":
                        value = me.subtitleFont;
                        element_id = "#subt_text_font";
                        break;
                }

                $(element_id).children("a").attr("data-font", value);

                var value_name = get_font_name(value);

                //update value on button with selected font name
                var fontFamilySelected = $(element_id).find('.fontFamilySelected');
                fontFamilySelected.html(value_name);
            },
            loadColor: function(type) {
                var value = "";
                var element_id = "";

                switch (type) {
                    case "normal":
                        value = me.normalColor;
                        element_id = "#normal_text_color";
                        break;
                    case "title":
                        value = me.titleColor;
                        element_id = "#title_text_color";
                        break;
                    case "subtitle":
                        value = me.subtitleColor;
                        element_id = "#subt_text_color";
                        break;
                }

                $(element_id).find(".sp-preview-inner").css("background-color", value);
            },
            updateConfig: function() {
                me.normalSize = parseFloat($("#normal_text_size").attr("value"));
                me.titleSize = parseFloat($("#title_text_size").attr("value"));
                me.subtitleSize = parseFloat($("#subt_text_size").attr("value"));

                me.normalFont = $("#normal_text_font").children("a").attr("data-font");
                me.titleFont = $("#title_text_font").children("a").attr("data-font");
                me.subtitleFont = $("#subt_text_font").children("a").attr("data-font");

                me.normalColor = rgbToHex($("#normal_text_color").find(".sp-preview-inner").css("background-color"));
                me.titleColor = rgbToHex($("#title_text_color").find(".sp-preview-inner").css("background-color"));
                me.subtitleColor = rgbToHex($("#subt_text_color").find(".sp-preview-inner").css("background-color"));

                me.boundTextOption = $("input[name='boundOption']:checked").attr("id");

            },
            updateConfigFromSaved: function(config) {
                me.normalSize = parseFloat(config.normalText.size);
                me.titleSize = parseFloat(config.titleText.size);
                me.subtitleSize = parseFloat(config.subtText.size);

                me.normalFont = config.normalText.font;
                me.titleFont = config.titleText.font;
                me.subtitleFont = config.subtText.font;

                me.normalColor = config.normalText.color;
                me.titleColor = config.titleText.color;
                me.subtitleColor = config.subtText.color;

                me.boundTextOption = config.boundTextOption;
            },
            getConfigVariable: function() {
                var normalText = {'size': me.normalSize, 'font': me.normalFont, 'color': me.normalColor};
                var titleText = {'size': me.titleSize, 'font': me.titleFont, 'color': me.titleColor};
                var subtitleText = {'size': me.subtitleSize, 'font': me.subtitleFont, 'color': me.subtitleColor};

                var config = {
                    'normalText': normalText,
                    'titleText': titleText,
                    'subtText': subtitleText,
                    'boundTextOption': me.boundTextOption
                };
                return config;
            },
            addPattern: function(key, value) {
                me.patterns[key] = value;
            },
            removePattern: function(key) {
                delete me.patterns[key];
            },
            copyTextToClipboard: function(element) {
                var value = element.selectionText; // <-- Selected text
                element.select();
                document.execCommand('copy', false, null);
            },
            cutTextToClipboard: function(element) {
                var value = element.selectionText; // <-- Selected text
                element.select();
                document.execCommand('cut', false, null);
            },
            pasteTextFromClipboard: function(element) {
                document.execCommand('paste', false, "asd");
            },
        };
