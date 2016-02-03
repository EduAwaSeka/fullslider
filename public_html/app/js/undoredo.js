'use strict';

var me = Impressionist.prototype;

function changeContent() {
    $("#body-editor").change();
}

function updateButtons(history) {
    $('.undo').attr('disabled', !history.canUndo());
    $('.redo').attr('disabled', !history.canRedo());
}

function setEditorContents(contents) {
    $('#body-editor').html(contents);
    me.removelisteners();
    me.attachListeners();
    me.enableDrag();
    me.addSlideEvents();
    me.enableSort();
    allowEdit();

    //Click on slide. It works with this form
    var thumbId = me.thumbIdFromSlide(me.selectedSlide);
    var slidemask = $("#"+thumbId+"> .slidemask");
    launchEvent("click", slidemask[0]);
}



function initializeUndoRedo() {
    $(function() {
        var history = new SimpleUndo({
            maxLength: 75,
            provider: function(done) {
                done($('#body-editor').html());
            },
            onUpdate: function() {
                //onUpdate is called in constructor, making history undefined
                if (!history)
                    return;

                updateButtons(history);
            },
        });

        history.initialize($('#body-editor').html());

        $('.undo').off();
        $('.redo').off();

        $('.undo').click(function(e) {
            e.stopPropagation();
            history.undo(setEditorContents);
        });
        $('.redo').click(function(e) {
            e.stopPropagation();
            history.redo(setEditorContents);
        });
        $('#body-editor').change(function() {
            history.save();
        });

        updateButtons(history);


        key('ctrl+z', function(e) {
            history.undo(setEditorContents);
        });

        key('ctrl+shift+z', function(e) {
            history.redo(setEditorContents);
        });
    });
}
//$("#body-editor").change(function(){
//    alert();
//});

