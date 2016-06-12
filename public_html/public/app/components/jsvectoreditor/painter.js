function setMode(mode)
{
    enableEditor();
    if (mode != "arrow") {
        $("#arrow-type").css("display", "none");
    }
    removeDisabledBtns();
    $($("#graphics-tools").find("[data-mode='" + mode + "']")).attr("disabled", "true");
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
        $("#graphic-options").css("display", "block");
        $(".btn").on("click", manageOnEditBtnEvents);
        $("#addtextbtn").attr("disabled", "true");
        $("#textDropdown").attr("disabled", "true");
        $("#addimagebtn").attr("disabled", "true");
        $("#addcodebtn").attr("disabled", "true");
        $(".undo").attr("disabled", "true");
        $(".redo").attr("disabled", "true");
    }
}
function disableEditor() {
    if (isEnabledEditor()) {
        $("#canvas").css("z-index", "-50");
        $("#graphic-options").css("display", "none");
        $(".btn").off("click", manageOnEditBtnEvents);
        $("#addtextbtn").attr("disabled", null);
        $("#textDropdown").attr("disabled", null);
        $("#addimagebtn").attr("disabled", null);
        $("#addcodebtn").attr("disabled", null);
        $(".undo").attr("disabled", undo_disabled);
        $(".redo").attr("disabled", redo_disabled);
        $("#arrow-type").css("display", "none");
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
    var width = widths.value;
    if (parseFloat(width) > parseFloat(widths.max)) {
        width = widths.max;
        widths.value = widths.max;
    }

    if (parseFloat(width) < parseFloat(widths.min)) {
        width = widths.min;
        widths.value = widths.min;
    }
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
    var ourElement = this;
    setFillColor(ourElement);
}


function onFillOpacityChange(e)
{
    var ourElement = this;
    setFillOpacity(ourElement);
}


function onStrokeColorChange(e)
{
    var ourElement = this;
    setStrokeColor(ourElement);
}


function onStrokeOpacityChange(e)
{
    var ourElement = this;
    setStrokeOpacity(ourElement);
}


function onStrokeWidthChange(e)
{
    var ourElement = $("#strokewidth")[0];
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

function onArrowStart() {
    var type = $("#arrow-start").val();
    editor.setArrowStart(type);
}
function onArrowEnd() {
    var type = $("#arrow-end").val();
    editor.setArrowEnd(type);
}

function onToolSelected() {
    var mode = $(this).attr("data-mode");
    if (mode == "arrow") {
        $("#arrow-start").val("none");
        $("#arrow-end").val("block");
        onArrowStart();
        onArrowEnd();

        $("#arrow-type").css("display", "block");
    }
    setMode($(this).attr("data-mode"));
}

function onGetMarkup() {
    alert(editor.getMarkup())
}


function onClearCanvas() {
    if (confirm('Are you sure you want to clear the canvas?')) {
        editor.deleteAll();
    }
}

function jsvectoreditor_init_events() {
// Init
    $("#closeDialogButton").click(onCloseDialog);
    $("#importShapesButton").click(import_shapes);

//    $("#fillcolor").change(onFillColorChange);
    $("#fillopacity").change(onFillOpacityChange);

//    $("#strokecolor").change(onStrokeColorChange);
    $("#strokeopacity").change(onStrokeOpacityChange);
    $("#strokewidth").change(onStrokeWidthChange);

    $('#selectSvg').on("click", onToolSelected);
    $('#selectp').on("click", onToolSelected);
    $('#drawRect').on("click", onToolSelected);
    $('#drawLine').on("click", onToolSelected);
    $('#drawEllipse').on("click", onToolSelected);
    $('#drawPath').on("click", onToolSelected);
    $('#drawPolygon').on("click", onToolSelected);
    $('#drawImage').on("click", onToolSelected);
    $('#drawText').on("click", onToolSelected);
    $('#drawArrow').on("click", onToolSelected);
    $('#deleteSvg').on("click", onToolSelected);
    $('#arrow-start').on("change", onArrowStart);
    $('#arrow-end').on("change", onArrowEnd);

    $('#getMarkup').on("click", onGetMarkup);
    $('#clearCanvas').on("click", onClearCanvas);

    $("#savesvg").on("click", save);
    $("#open").on("click", opendialog);

    $("#graphics-tools").off();
}

function jsvectoreditor_init() {
    jsvectoreditor_init_events();
    $("#fillopacity").html(opacity_selector);
//    $("#strokeopacity").html(opacity_selector);
    setupColorPicker($("#fillcolor"), setFillHexColor, $("#fillcolor").attr("data-dfcolor"));
    setupColorPicker($("#strokecolor"), setStrokeHexColor, $("#strokecolor").attr("data-dfcolor"));

    editor = new VectorEditor(document.getElementById("canvas"), $("#graphicsmodal").width(), $("#graphicscontainer").height());

    $("#graphics-tools").on("click", function() {
        editor.unselect();
    });
    onEditEnd();
}

function deleteJvectoreditorEvents() {
    // Init
    $("#closeDialogButton").off();
    $("#importShapesButton").off();

//    $("#fillcolor").off();
    $("#fillopacity").off();

//    $("#strokecolor").off();
    $("#strokeopacity").off();
    $("#strokewidth").off();

    $('#selectSvg').off();
    $('#selectp').off();
    $('#drawRect').off();
    $('#drawLine').off();
    $('#drawEllipse').off();
    $('#drawPath').off();
    $('#drawPolygon').off();
    $('#drawImage').off();
    $('#drawText').off();
    $('#drawArrow').off();
    $('#arrow-start').off();
    $('#arrow-end').off();
    $('#deleteSvg').off();

    $('#getMarkup').off();
    $('#clearCanvas').off();

    $("#savesvg").off();
    $("#open").off();
}

function resetGraphicsEditor() {
    deleteJvectoreditorEvents();
    del_color_picker($("#fillcolor"));
    del_color_picker($("#strokecolor"));
    jsvectoreditor_init();
}

//$(window).resize(function() {
//    editor.draw.setSize($(window).width(), $(window).height());
//    editor.on("select", function(event, shape) {
//        // shape.attr("")
//    });
//});

function del_color_picker(elem) {
    $($(elem).find(".sp-replacer ")[0]).remove();
}