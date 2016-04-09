function setMode(mode)
{
    enableEditor();
    if (mode == "text") {
        editor.prop.text = prompt("Text:", editor.prop.text);
    } else if (mode == "image") {
        editor.prop.src = prompt("Image Source URL:", editor.prop.src);
    }

    removeDisabledBtns();
    $("#" + mode).attr("disabled", "true");

    editor.setMode(mode == 'selectp' ? 'selectp' : mode);
}

function removeDisabledBtns() {
    var btn_list = $("#graphics-tools").children();

    for (var i = 0; i < btn_list.length; i++) {
        $(btn_list[i]).attr("disabled", null);
    }
}

function manageOnEditBtnEvents(e) {
    var t = $(e.target);
    if (!($("#graphics-tools").find(t).length)) {
        onEditEnd();
    }
}

var undo_disabled = "true";
var redo_disabled = "true";

function enableEditor() {
    if (!isEnabledEditor()) {
        undo_disabled = $(".undo").attr("disabled");
        if (undo_disabled === undefined || undo_disabled === null) {
            undo_disabled = false;
        }

        redo_disabled = $(".redo").attr("disabled");
        if (redo_disabled === undefined || redo_disabled === null) {
            redo_disabled = false;
        }

        $("#canvas").css("z-index", "50");
        $("#graphic-options").css("z-index", "50");
        $(".btn").on("click", manageOnEditBtnEvents);
        $("#addtextbtn").attr("disabled", "true");
        $("#textDropdown").attr("disabled", "true");
        $("#addimagebtn").attr("disabled", "true");
        $(".undo").attr("disabled", "true");
        $(".redo").attr("disabled", "true");
    }
}
function disableEditor() {
    if (isEnabledEditor()) {
        $("#canvas").css("z-index", "-50");
        $("#graphic-options").css("z-index", "-50");
        $(".btn").off("click", manageOnEditBtnEvents);
        $("#addtextbtn").attr("disabled", null);
        $("#textDropdown").attr("disabled", null);
        $("#addimagebtn").attr("disabled", null);
        $(".undo").attr("disabled", undo_disabled);
        $(".redo").attr("disabled", redo_disabled);
    }
}

function isEnabledEditor() {
    return ($("#canvas").css("z-index") == 50);
}

function setFillColor(colors)
{
    var color = colors.options[colors.selectedIndex];

    editor.set("fill", color.value);

    $("#fillcolor")
            .removeClass()
            .addClass(color.value + "Thing");
}

function setFillHexColor(color)
{
    editor.set("fill", color);

    $("#fillcolor")
            .removeClass()
            .addClass(color + "Thing");
}


function setStrokeColor(colors)
{
    var color = colors.options[colors.selectedIndex];

    editor.set("stroke", color.value);

    $("#strokecolor")
            .removeClass()
            .addClass(color.value + "Thing");

}

function setStrokeHexColor(color)
{
    editor.set("stroke", color);

    $("#strokecolor")
            .removeClass()
            .addClass(color + "Thing");

}


function setStrokeWidth(widths)
{
    var width = widths.options[widths.selectedIndex].value;

    editor.set("stroke-width", width);
}


function setStrokeOpacity(widths)
{
    var width = widths.options[widths.selectedIndex].value;

    editor.set("stroke-opacity", parseFloat(width));
}


function setFillOpacity(widths)
{
    var width = widths.options[widths.selectedIndex].value;

    editor.set("fill-opacity", parseFloat(width));
}


function getOptionByValue(select, value)
{
    for (var i = 0; i < select.length; i++) {
        if (select.options[i].value == value) {
            return i;
        }
    }

    return -1;
}


function save()
{
    $("#data").val(TinyJson.encode(jQuery.map(editor.shapes, dumpshape)));
    $("#dialog").slideDown();

    // for(var i = 0; i < editor.shapes.length; i++){
    // dumpshape(editor.shapes[i])
    // }
}


function opendialog()
{
    $("#data").val("");
    $("#dialog").slideDown();
}


function import_shapes()
{
    try {
        // JockM: this is a big ol' security hole.  Any arbitrary JS code 
        // can be executed by it.  Also this is SLOWER than using a formal
        // JSON parser
        var json = eval("(" + $("#data").val() + ")");

        jQuery(json).each(function(index, item) {
            loadShape(item);
        });

        $("#dialog").slideUp();
    } catch (err) {
        alert(err.message);
    }
}

var attr = [
    "cx", "cy", "fill", "fill-opacity", "font", "font-family",
    "font-size", "font-weight", "gradient", "height", "opacity",
    "path", "r", "rotation", "rx", "ry", "src", "stroke",
    "stroke-dasharray", "stroke-opacity", "stroke-width", "width",
    "x", "y", "text"
];

dumpshape = function(shape) {
    // return Ax.canvas.info(shape)
    var info = {
        type: shape.type,
        id: shape.id,
        subtype: shape.subtype
    };

    for (var i = 0; i < attr.length; i++) {
        var tmp = shape.attr(attr[i]);

        if (tmp) {
            if (attr[i] == "path") {
                tmp = tmp.toString();
            }

            info[attr[i]] = tmp;
        }
    }

    return info;
};


loadShape = function(shape, noattachlistener) {
    var instance = editor; // instance?instance:Ax.canvas

    if (!shape || !shape.type || !shape.id) {
        return;
    }

    var newshape = null;
    var draw = instance.draw;
    var editor; //JockM: ???

    if (!(newshape = editor.getShapeById(shape.id))) {
        switch (shape.type) {
            case "rect":
                newshape = draw.rect(0, 0, 0, 0);
                break;

            case "path":
                newshape = draw.path("");
                break;

            case "image":
                newshape = draw.image(shape.src, 0, 0, 0, 0);
                break;

            case "ellipse":
                newshape = draw.ellipse(0, 0, 0, 0);
                break;

            case "text":
                newshape = draw.text(0, 0, shape.text);
                break;

            default:
                break;
        }
    }

    newshape.attr(shape);
    newshape.id = shape.id;
    newshape.subtype = shape.subtype;

    if (!noattachlistener) {
        instance.addShape(newshape, true);
    }
};


// Event Handlers
function onCloseDialog()
{
    jQuery('#dialog').slideUp();
}


function onFillColorChange(e)
{
    var ourElement = e.srcElement || e.originalTarget;
    setFillColor(ourElement);
}


function onFillOpacityChange(e)
{
    var ourElement = e.srcElement || e.originalTarget;
    setFillOpacity(ourElement);
}


function onStrokeColorChange(e)
{
    var ourElement = e.srcElement || e.originalTarget;
    setStrokeColor(ourElement);
}


function onStrokeOpacityChange(e)
{
    var ourElement = e.srcElement || e.originalTarget;
    setStrokeOpacity(ourElement);
}


function onStrokeWidthChange(e)
{
    var ourElement = e.srcElement || e.originalTarget;
    setStrokeWidth(ourElement);
}

function onEditEnd() {
    removeDisabledBtns();
    $("#editEnd").attr("disabled", "true");
    $("#cancelEdit").attr("disabled", "true");
    $("#selectSvg").attr("disabled", "true");
    $("#deleteSvg").attr("disabled", "true");
    disableEditor();
    editor.deleteAll();
}

function onSelect() {
    setMode('select');
}


function onSelectp() {
    setMode('selectp');
}


function onRect() {
    setMode('rect');
}


function onLine() {
    setMode('line');
}


function onEllipse() {
    setMode('ellipse');
}

function onPath() {
    setMode('path');
}


function onPolygon() {
    setMode('polygon');
}


function onImage() {
    setMode('image');
}


function onText() {
    setMode('text');
}


function onDelete() {
    setMode('delete');
}


function onGetMarkup() {
    alert(editor.getMarkup())
}


function onClearCanvas() {
    if (confirm('Are you sure you want to clear the canvas?')) {
        editor.deleteAll();
    }
}


// Init
function jsvectoreditor_init() {
    $("#closeDialogButton").click(onCloseDialog);
    $("#importShapesButton").click(import_shapes);

//    $("#fillcolor").change(onFillColorChange);
    $("#fillopacity").change(onFillOpacityChange);

//    $("#strokecolor").change(onStrokeColorChange);
    $("#strokeopacity").change(onStrokeOpacityChange);
    $("#strokewidth").change(onStrokeWidthChange);

    $('#selectSvg').on("click", onSelect);
    $('#selectp').on("click", onSelectp);
    $('#rect').on("click", onRect);
    $('#line').on("click", onLine);
    $('#ellipse').on("click", onEllipse);
    $('#path').on("click", onPath);
    $('#polygon').on("click", onPolygon);
    $('#image').on("click", onImage);
    $('#text').on("click", onText);
    $('#deleteSvg').on("click", onDelete);

    $('#getMarkup').on("click", onGetMarkup);
    $('#clearCanvas').on("click", onClearCanvas);

    $("#savesvg").on("click", save);
    $("#open").on("click", opendialog);

    setupColorPicker($("#fillcolor"), setFillHexColor);
    setupColorPicker($("#strokecolor"), setStrokeHexColor);

    editor = new VectorEditor(document.getElementById("canvas"), $("#graphicsmodal").width(), $("#graphicscontainer").height());

    $("#graphics-tools").on("click", function() {
        editor.unselect();
    });

    // editor.draw.rect(100,100,480,272).attr("stroke-width",
    // 0).attr("fill", "white")
    onEditEnd();
}
;

//$(window).resize(function() {
//    editor.draw.setSize($(window).width(), $(window).height());
//    editor.on("select", function(event, shape) {
//        // shape.attr("")
//    });
//});



function setupColorPicker(elem, fn)
{
    var $colorChooser = elem.find(".color-chooser");
    if ($colorChooser.length > 0) {
        var hex = elem.attr("data-dfcolor");
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
                color = color.toHexString();
                fn(color);
            }
        });
        var prevent = function(e) {
            e.preventDefault();
        };
        $(".sp-container").mousedown(prevent);
        $colorChooser.mousedown(prevent);
        $colorChooser.find("div").css("backgroundColor", '#' + hex);
    }
}