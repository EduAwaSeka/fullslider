'use strict';

function changeContent() {
    me.changesCounter++;
    $("#body-editor").change();
}

function updateButtons(history) {
    $('.undo').attr('disabled', !history.canUndo());
    $('.redo').attr('disabled', !history.canRedo());
}

function initEvents() {
    me.removelisteners();
    me.attachListeners();
    me.enableDrag();
    me.addSlideEvents();
    me.enableSort();
    resetGraphicsEditor();
    allowEdit();
    playInit();
    //Click on slide. It works with this form
    var thumbId = me.thumbIdFromSlide(me.selectedSlide);
    var slidemask = $("#" + thumbId + "> .slidemask");
    launchEvent("click", slidemask[0]);
}

function setEditorContents(contents) {
    $('#body-editor').html(contents);
    initEvents();
}


function initializeUndoRedo() {
    me.changesCounter = 0;
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
            me.changesCounter--;
            history.undo(setEditorContents);
        });
        $('.redo').click(function(e) {
            e.stopPropagation();
            me.changesCounter++;
            history.redo(setEditorContents);
        });
        $('#body-editor').change(function() {
            history.save();
        });

        updateButtons(history);

        key('ctrl+z', function(e) {
            me.changesCounter--;
            history.undo(setEditorContents);
        });

        key('ctrl+shift+z', function(e) {
            me.changesCounter++;
            history.redo(setEditorContents);
        });
    });
}