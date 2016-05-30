function allowEdit() {
    (function() {
        var article = Backbone.Model.extend({
            defaults: {
                title: 'Default Title',
                body: 'Default body text'
            }
        });

        var articleView = Backbone.View.extend({
            initialize: function() {
                _.bindAll(this, 'save');
                this.model.bind('save', this.save);
            },
            events: {
                'dblclick .editable': 'editableClick'
            },
            editableClick: etch.editableInit,
            save: function() {


            }

        });

        $article = $('.slideviewportcontainer');
        var model = new article();
        var view = new articleView({model: model, el: $article[0], tagName: $article[0].tagName});
    })();
}


function scalePlay(element) {
    var elem_height = element.offsetHeight;
    var rel = getRel();
    var heightVW = elem_height / rel;
    var halfHeightVW = heightVW / 2;

    $("#play").css("width", $(element).css("width"));
    $("#play").css("top", $(element).css("top"));
    $("#play").css("left", $(element).css("left"));

    $("#play").children(".scale").css("top", ((elem_height - 2) / rel) + "vw");
    $("#play").children(".skewy").css("top", halfHeightVW - 0.57 + "vw");
    $("#play").children(".rotate").css("top", halfHeightVW - 0.49 + "vw");

    //0.5 height of ui-resizable button / 2 = 0.25
    var sTop = heightVW - 0.25;
    $("#play").children(".ui-resizable-s").css("top", sTop + "vw");
    $("#play").children(".ui-resizable-sw").css("top", sTop + "vw");
    $("#play").children(".ui-resizable-se").css("top", sTop + "vw");

    var sideTop = halfHeightVW - 0.25;
    $("#play").children(".ui-resizable-e").css("top", sideTop + "vw");
    $("#play").children(".ui-resizable-w").css("top", sideTop + "vw");
}

function getFontSize(element) {
    return element.css("font-size").replace(/[^-\d\.]/g, '');
}

function getNumericValue(value) {
    return value.toString().replace(/[^-\d\.]/g, '');
}

function getFloatValue(value) {
    return parseFloat(getNumericValue(value));
}

function pxToVw(value) {
    return value / getRel();
}


function vwToPx(value) {
    return value * getRel();
}

function getRel() {
    return $("html").css("font-size").replace(/[^-\d\.]/g, '');
}

function launchEvent(event, element) {
    var nouEvent = document.createEvent("MouseEvents");
    nouEvent.initMouseEvent(event, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(nouEvent);
}

function drawElement(element) {
    var rel = getRel();
    var top = element.offsetTop / rel;
    var left = element.offsetLeft / rel;
    $(element).css("top", top + "vw");
    $(element).css("left", left + "vw");
}

function openAlert(type, msg) {
    var alertId = "#" + type + "alert";
    var msgId = "#" + type + "msg";

    $(alertId).fadeOut(0);
    $(msgId).html(msg);
    $(alertId).fadeIn(500);

    window.setTimeout(function() {
        $(alertId).fadeOut(1200);
    }, 5000);
}

function calculateMaxWidth(element, parent) {
    var left = $(element).position().left;
    var width = parent.width();
    return pxToVw(width - left);
}
function calculateMaxHeight(element, parent) {

    var top = $(element).position().top;
    var height = parent.height();
    return pxToVw(height - top);
}

function decreaseSize(element) {
    var size = getFontSize(element);
    var fontSizeReadout = document.getElementsByClassName('fontSizeReadout')[0];
    size = pxToVw(size);
    if (size <= 1) {
        if (size == 1) {
            element.css("font-size", size + "vw");
            fontSizeReadout.innerHTML = parseInt(getFontSize(element));
        }
        return false;
    }
    else {
        size = size - 0.5;
        element.css("font-size", size + "vw");
        fontSizeReadout.innerHTML = parseInt(getFontSize(element));
        return true;
    }
}


function isInElement(parent, element) {
    return (($(parent).has(element).length > 0) || $(element).html() == parent.html());
}

function isElementByClass(parentClass, element) {
    return ($(element).hasClass(parentClass) || $(element).parent().hasClass(parentClass));
}

function get_font_name(font) {
    var name = font;
    if (font[0] === "'") {
        name = name.substr(name.indexOf("'") + 1, name.lastIndexOf("'") - 1);
    }
    else {
        name = name.substr(0, name.lastIndexOf(","));
    }
    return name;
}


function extractValue(e) {
    var value = e.target.dataset.value;
    if (value == null) {
        $target = $(e.target);
        value = $target.parent()[0].dataset.value;
    }
    return value;
}


//Convert rgb color format to hexadecimal format
function rgbToHex(total) {
    var total = total.toString().split(',');
    var r = total[0].substring(4);
    var g = total[1].substring(1);
    var b = total[2].substring(1, total[2].length - 1);
    return ("#" + checkNumber((r * 1).toString(16)) + checkNumber((g * 1).toString(16)) + checkNumber((b * 1).toString(16))).toUpperCase();
}
function checkNumber(i) {
    i = i.toString();
    if (i.length == 1)
        return '0' + i;
    else
        return i;
}


function clearSelection() {
    if (document.selection) {
        document.selection.empty();
    } else if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
}


function isUndo(e) {
    var isUndo = false;
    var thisKey = e.which;

    if (e.ctrlKey) {
        if (e.shiftKey) {
            return isUndo;
        } else {
            if (thisKey == 90)
            {
                isUndo = true;
            }
        }
    }
    return isUndo;
}

function isRedo(e) {
    var isRedo = false;

    var thisKey = e.which;

    if (e.ctrlKey) {
        if (thisKey == 89) {
            isRedo = true;
        }
        else {
            if (e.shiftKey) {
                if (thisKey == 90)
                {
                    isRedo = true;
                }
            }
        }
    }
    return isRedo;
}


function getElementEditing() {
    return $(document).find("[contentEditable='true']");
}




function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], {type: mimeString});
    return blob;
}

function setupColorPicker(elem, fn, color_init)
{
    var $colorChooser = elem.find(".color-chooser");
    if ($colorChooser.length > 0) {
        var hex = color_init || "333";
        $colorChooser.spectrum({
            color: '#' + hex,
            preferredFormat: "hex",
            showSelectionPalette: true,
            showPalette: true,
            showInitial: true,
            showInput: true,
            showButtons: true,
            cancelText: '<i class="fa fa-remove"></i>',
            chooseText: '<i class="fa fa-check"></i>',
            palette: [],
            clickoutFiresChange: false,
            theme: 'sp-dark',
            change: function(color) {
                Backbone.trigger('etch:state', {
                    color: color.toHexString()
                });
                fn(color);
            }
        });
        var prevent = function(e) {
            e.preventDefault();
        };

        $(".sp-replacer").mousedown(prevent);
        $(".sp-container").mousedown(prevent);
        $colorChooser.mousedown(prevent);
        updateCurrentColor($colorChooser, '#' + hex);
    }
    return $colorChooser;
}

function updateCurrentColor(element, color) {
    $(element.find(".sp-preview-inner")).css("backgroundColor", color);
}

function updateCurrentOpacity(element, type) {
    var graphic = getGraphicEditableElement();
    var option = $(element).find("[value='" + $(graphic).css(type) + "']");
    $(option[0]).prop('selected', true);
}
function updateCurrentStrokeWidth() {
    var graphic = getGraphicEditableElement();
    $("#edit-stroke-width").val($(graphic).attr("stroke-width"));
}

function getGraphicEditableElement() {
    var el = me.selectedforedit;
    var svg = $($(el).find("svg"));
    var last = $(svg.children()).size() - 1;
    var graphic = $(svg).children()[last];
    return graphic;
}

function changeFillColor(color) {
    var graphic = getGraphicEditableElement();
    $(graphic).attr("fill", color);
    changeContent();
}

function changeStrokeColor(color) {
    var graphic = getGraphicEditableElement();
    $(graphic).attr("stroke", color);
    if ($(graphic).attr("data-svgtype") == "arrow") {
        var head = $($(graphic).parent()).find("use")[0];
        $(head).attr("fill", color);//Arrowhead is fill instead of stroke
        head = $(head).attr("href");
        $(head).attr("fill", color);//Arrowhead is fill instead of stroke
    }
    changeContent();
}

function changeStrokeWidth() {
    var graphic = getGraphicEditableElement();
    var stroke_width = $("#edit-stroke-width").val();
    $(graphic).attr("stroke-width", stroke_width);
    var element = me.selectedforedit;

    me.addGraphicStyle(element, graphic);
    changeContent();
}

function changeStrokeOpacity() {
    changeOpacity(this, "stroke-opacity");
}
function changeFillOpacity() {
    changeOpacity(this, "fill-opacity");
}

function changeOpacity(el, type) {
    var opacity = el.options[el.selectedIndex].value;
    var graphic = getGraphicEditableElement();
    $(graphic).css(type, opacity);
}

function getCurrentGraphicColor(type) {
    var graphic = getGraphicEditableElement();
    return $(graphic).attr(type);
}

function getSvgViewBoxArray(svg) {
    var vb = svg.getAttribute('viewBox');
    vb = vb.split(" ");
    return vb;
}

function setSvgViewBoxArray(svg, vb) {
    svg.setAttribute('viewBox', vb.join(" "));
}

function getTransformMatrixValues(matrix) {
    var transform_values = matrix.replace("matrix(", "");
    transform_values = transform_values.replace(")", "");
    transform_values = transform_values.split(",");
    return transform_values;
}