(function() {
    'use strict';

    var models = {},
            views = {},
            collections = {},
            etch = {};

    // versioning as per semver.org
    etch.VERSION = '0.6.2';

    etch.config = {
        // selector to specify editable elements   
        selector: '.editable',
        // Named sets of buttons to be specified on the editable element
        // in the markup as "data-button-class"   
        buttonClasses: {
            'default': ['save'],
            'all': ['bold', 'italic', 'underline', 'unordered-list', 'ordered-list', 'link', 'clear-formatting', 'save'],
            'title': ['bold', 'italic', 'underline', 'save'],
            'text': ['bold', 'italic', 'underline', 'justify-left', 'justify-center', 'justify-right', 'unordered-list', 'ordered-list', 'link', 'clear-formatting', 'font-size', 'font-family', 'color']
        }
    };

    function extractValue(e) {
        var value = e.target.dataset.value;
        if (value == null) {
            $target = $(e.target);
            value = $target.parent()[0].dataset.value;
        }
        return value;
    }

    models.Editor = Backbone.Model;

    views.Editor = Backbone.View.extend({
        initialize: function() {
            this.$el = $(this.el);

            // Model attribute event listeners:
            _.bindAll(this, 'changeButtons', 'changePosition', 'changeEditable', 'insertImage');
            this.model.bind('change:buttons', this.changeButtons);
            this.model.bind('change:position', this.changePosition);
            this.model.bind('change:editable', this.changeEditable);

            // Init Routines:
            this.changeEditable();
        },
        events: {
            'click .etch-bold': 'toggleBold',
            'click .etch-italic': 'toggleItalic',
            'click .etch-underline': 'toggleUnderline',
            'click .etch-heading': 'toggleHeading',
            'click .etch-unordered-list': 'toggleUnorderedList',
            'click .etch-justify-left': 'justifyLeft',
            'click .etch-justify-center': 'justifyCenter',
            'click .etch-justify-right': 'justifyRight',
            'click .etch-ordered-list': 'toggleOrderedList',
            'click .etch-link': 'toggleLink',
            'click .etch-image': 'getImage',
            'click .etch-save': 'save',
            'click .etch-clear-formatting': 'clearFormatting',
            'click [data-option="fontSize"]': 'setFontSize',
            'click [data-option="fontFamily"]': 'setFontFamily'
        },
        changeEditable: function() {
            this.setButtonClass();
            // Im assuming that Ill add more functionality here
        },
        setButtonClass: function() {
            // check the button class of the element being edited and set the associated buttons on the model
            var editorModel = this.model;
            var buttonClass = editorModel.get('editable').attr('data-button-class') || 'default';
            editorModel.set({buttons: etch.config.buttonClasses[buttonClass]});
        },
        changeButtons: function() {
            // render the buttons into the editor-panel
            this.$el.empty();
            var view = this;
            var buttons = this.model.get('buttons');

            // hide editor panel if there are no buttons in it and exit early
            if (!buttons.length) {
                $(this.el).hide();
                return;
            }

            _.each(this.model.get('buttons'), function(button) {
                switch (button) {
                    case "font-size":
                        var $buttonEl = $(font_size_selector);
                        break;
                    case "font-family":
                        var $buttonEl = $(font_family_selector);
                        break;
                    case "color":
                        var $buttonEl = $(color_selector);
                        break;
                    default:
                        var $buttonEl = $('<a href="#" class="etch-editor-button etch-' + button + '" title="' + button.replace('-', ' ') + '"><span class="is-etch-button"></span></a>');
                }

                view.$el.append($buttonEl);
            });

            $(this.el).show('fast');

            var $colorChooser = this.$el.find(".color-chooser");
            if ($colorChooser.length > 0) {
                var hex = '333';
                $colorChooser.spectrum({
                    color: '#' + hex,
                    showSelectionPalette: true,
                    showPalette: true,
                    showInitial: true,
                    showInput: true,
                    palette: [],
                    clickoutFiresChange: true,
                    theme: 'sp-dark',
                    move: function(color) {
                        // $colorChooser.find("div").css("backgroundColor", "#" + hex);
                        //view.model.get('editableModel').set('color', hex)
                        document.execCommand('foreColor', false, color.toHexString());
                    },
                    change: function(color) {
                        Backbone.trigger('etch:state', {
                            color: color.toHexString()
                        });
                    }
                });

                var prevent = function(e) {
                    e.preventDefault();
                };

                $(".sp-replacer").mousedown(prevent);
                $(".sp-container").mousedown(prevent);
                $colorChooser.mousedown(prevent);

                $colorChooser.find("div").css("backgroundColor", '#' + hex)
            }

            var $toggle = this.$el.find('.dropdown-toggle');
            $toggle.dropdown();
            this.$fontSizeReadout = this.$el.find('.fontSizeReadout');
            this.$colorChooser = $colorChooser;
            this.$fontFamilyReadout = this.$el.find('.fontFamilyBtn > .text');
        },
        changePosition: function() {
            // animate editor-panel to new position
            var pos = this.model.get('position');
            this.$el.animate({'top': pos.y, 'left': pos.x}, {queue: false});
        },
        wrapSelection: function(selectionOrRange, elString, cb) {
            // wrap current selection with elString tag
            var range = selectionOrRange === Range ? selectionOrRange : selectionOrRange.getRangeAt(0);
            var el = document.createElement(elString);
            range.surroundContents(el);
        },
        clearFormatting: function(e) {
            e.preventDefault();
            document.execCommand('removeFormat', false, null);
        },
        toggleBold: function(e) {
            e.preventDefault();
            document.execCommand('bold', false, null);
        },
        toggleItalic: function(e) {
            e.preventDefault();
            document.execCommand('italic', false, null);
        },
        toggleUnderline: function(e) {
            e.preventDefault();
            document.execCommand('underline', false, null);
        },
        toggleHeading: function(e) {
            e.preventDefault();
            var range = window.getSelection().getRangeAt(0);
            var wrapper = range.commonAncestorContainer.parentElement;
            if ($(wrapper).is('h3')) {
                $(wrapper).replaceWith(wrapper.textContent);
                return;
            }
            var h3 = document.createElement('h3');
            range.surroundContents(h3);
        },
        urlPrompt: function(callback) {
            // This uses the default browser UI prompt to get a url.
            // Override this function if you want to implement a custom UI.

            var url = prompt('Enter a url', 'http://');

            // Ensure a new link URL starts with http:// or https:// 
            // before it's added to the DOM.
            //
            // NOTE: This implementation will disallow relative URLs from being added
            // but will make it easier for users typing external URLs.
            if (/^((http|https)...)/.test(url)) {
                callback(url);
            } else {
                callback("http://" + url);
            }
        },
        toggleLink: function(e) {
            e.preventDefault();
            var range = window.getSelection().getRangeAt(0);

            // are we in an anchor element?
            if (range.startContainer.parentNode.tagName === 'A' || range.endContainer.parentNode.tagName === 'A') {
                // unlink anchor
                document.execCommand('unlink', false, null);
            } else {
                // promt for url and create link
                this.urlPrompt(function(url) {
                    document.execCommand('createLink', false, url);
                });
            }
        },
        toggleUnorderedList: function(e) {
            e.preventDefault();
            document.execCommand('insertUnorderedList', false, null);
        },
        toggleOrderedList: function(e) {
            e.preventDefault();
            document.execCommand('insertOrderedList', false, null);
        },
        justifyLeft: function(e) {
            e.preventDefault();
            document.execCommand('justifyLeft', false, null);
        },
        justifyCenter: function(e) {
            e.preventDefault();
            document.execCommand('justifyCenter', false, null);
        },
        justifyRight: function(e) {
            e.preventDefault();
            document.execCommand('justifyRight', false, null);
        },
        getImage: function(e) {
            e.preventDefault();

            // call startUploader with callback to handle inserting it once it is uploded/cropped
            this.startUploader(this.insertImage);
        },
        startUploader: function(cb) {
            // initialize Image Uploader
            var model = new models.ImageUploader();
            var view = new views.ImageUploader({model: model});

            // stash a reference to the callback to be called after image is uploaded
            model._imageCallback = function(image) {
                view.startCropper(image, cb);
            };


            // stash reference to saved range for inserting the image once its 
            this._savedRange = window.getSelection().getRangeAt(0);

            // insert uploader html into DOM
            $('body').append(view.render().el);
        },
        insertImage: function(image) {
            // insert image - passed as a callback to startUploader
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(this._savedRange);

            var attrs = {
                'editable': this.model.get('editable'),
                'editableModel': this.model.get('editableModel')
            };

            _.extend(attrs, image);

            var model = new models.EditableImage(attrs);
            var view = new views.EditableImage({model: model});
            this._savedRange.insertNode($(view.render().el).addClass('etch-float-left')[0]);
        },
        save: function(e) {
            e.preventDefault();
            var editableModel = this.model.get('editableModel');
            editableModel.trigger('save');
        },
        setFontFamily: function(e) {

            var value = extractValue(e);
            //document.execCommand('fontName', false, value);
            var elementToChange = $(document).find("[contentEditable='true']");
            elementToChange.css("font-family", value);
            if (value[0] === "'") {
                value = value.substr(value.indexOf("'") + 1, value.lastIndexOf("'") - 1);
            }
            else {
                value = value.substr(0, value.lastIndexOf(","));
            }

            //update value on editor button
            var fontFamilyReadout = document.getElementsByClassName('fontFamilyReadout');
            fontFamilyReadout[0].innerHTML = value;

            Backbone.trigger('etch:state', {
                face: value
            });
        },
        setFontSize: function(e) {
            //Extract selected value
            var value = extractValue(e);
            var fontSizeReadout = this.$el.find(".fontSizeReadout");
            var elementToChange = $(document).find("[contentEditable='true']");
            
            //Update element font-size value
            elementToChange.css("font-size", pxToVw(value) + "vw");

            //update value on editor button
            fontSizeReadout.text(value);


            Backbone.trigger('etch:state', {
                size: value
            });

        }

    });


    // tack on models, views, etc... as well as init function
    _.extend(etch, {
        models: models,
        views: views,
        collections: collections,
        // This function is to be used as callback to whatever event
        // you use to initialize editing 
        editableInit: function(e) {
            e.stopPropagation();
            var target = e.target || e.srcElement;
            var $editable = $(target).etchFindEditable();
            var fontSizeReadout;
            var fontFamilyReadout;
            $(".slidelement").attr("contentEditable", "false");
            $editable.attr('contenteditable', true);

            // if the editor isn't already built, build it
            var $editor = $('.etch-editor-panel');
            var editorModel = $editor.data('model');

            //this.$fontSizeReadout.text($editable.css("font-size"));
            if (!$editor.size()) {
                $editor = $('<div class="etch-editor-panel">');
                var editorAttrs = {editable: $editable, editableModel: this.model};
                document.body.appendChild($editor[0]);
                $editor.etchInstantiate({classType: 'Editor', attrs: editorAttrs});
                editorModel = $editor.data('model');
                $editor.css("overflow", "initial");

                // check if we are on a new editable
            } else if ($editable[0] !== editorModel.get('editable')[0]) {
                // set new editable
                editorModel.set({
                    editable: $editable,
                    editableModel: this.model
                });
                $editor.css("display", "block");
                $editor.css("overflow", "initial");
            } else {
                $editor.css("display", "block");
                $editor.css("overflow", "initial");
            }

            //initialize value of font-size etch-editor-button with selected element value
            fontSizeReadout = document.getElementsByClassName('fontSizeReadout')[0];
            fontSizeReadout.innerHTML=parseInt(getFontSize($editable));

            //initialize value of font-family etch-editor-button with selected element value
            fontFamilyReadout = document.getElementsByClassName('fontFamilyReadout');
            var value = $editable.css("font-family");
            if (value[0] === "'") {
                value = value.substr(value.indexOf("'") + 1, value.lastIndexOf("'") - 1);
            }
            else {
                if (value[0] === "\"") {
                    value = value.substr(value.indexOf("'") + 1, value.lastIndexOf("'") - 1);
                } else {
                    value = value.substr(0, value.lastIndexOf(","));
                }
            }
            fontFamilyReadout[0].innerHTML = value;


            // Firefox seems to be only browser that defaults to `StyleWithCSS == true`
            // so we turn it off here. Plus a try..catch to avoid an error being thrown in IE8.
            try {
                document.execCommand('StyleWithCSS', false, false);
            }
            catch (err) {
                // expecting to just eat IE8 error, but if different error, rethrow
                if (err.message !== "Invalid argument.") {
                    throw err;
                }
            }

            if (models.EditableImage) {
                // instantiate any images that may be in the editable
                var $imgs = $editable.find('img');
                if ($imgs.size()) {
                    var attrs = {editable: $editable, editableModel: this.model};
                    $imgs.each(function() {
                        var $this = $(this);
                        if (!$this.data('editableImageModel')) {
                            var editableImageModel = new models.EditableImage(attrs);
                            var editableImageView = new views.EditableImage({model: editableImageModel, el: this, tagName: this.tagName});
                            $this.data('editableImageModel', editableImageModel);
                        }
                    });
                }
            }

            // listen for mousedowns that are not coming from the editor
            // and close the editor
            $('body').bind('mousedown.editor', function(e) {
                // check to see if the click was in an etch tool
                var target = e.target || e.srcElement;
                if ($(target).not('.etch-editor-panel, .etch-editor-panel *, .etch-image-tools, .etch-image-tools *, .elementediting, .elementediting *,.sp-container *, .colorpicker *, #colorpickerbtn').size()) {
                    // remove editor
                    $editor.css("display", "none");

                    if (models.EditableImage) {
                        // unblind the image-tools if the editor isn't active
                        $editable.find('img').unbind('mouseenter');

                        // remove any latent image tool model references
                        $(etch.config.selector + ' img').data('editableImageModel', false);
                    }

                    // once the editor is removed, remove the body binding for it
                    $(this).unbind('mousedown.editor');
                }
            });

            this.model.trigger('change:size', this.model, this.model.get('size'), {});
            if (e.pageX === 0) {
                editorModel.set({position: {x: $editable.offset().left - 15, y: $editable.offset().top - 80}});
            } else {
                editorModel.set({position: {x: e.pageX - 15, y: e.pageY - 80}});
            }
        }
    });

    // jquery helper functions
    $.fn.etchInstantiate = function(options, cb) {
        return this.each(function() {
            var $el = $(this);
            options || (options = {});

            var settings = {
                el: this,
                attrs: {}
            };

            _.extend(settings, options);

            var model = new models[settings.classType](settings.attrs, settings);

            // initialize a view is there is one
            if (_.isFunction(views[settings.classType])) {
                var view = new views[settings.classType]({model: model, el: this, tagName: this.tagName});
            }

            // stash the model and view on the elements data object
            $el.data({model: model});
            $el.data({view: view});

            if (_.isFunction(cb)) {
                cb({model: model, view: view});
            }
        });
    };

    $.fn.etchFindEditable = function() {
        // function that looks for the editable selector on itself or its parents
        // and returns that el when it is found
        var $el = $(this);
        return $el.is(etch.config.selector) ? $el : $el.closest(etch.config.selector);
    };

    window.etch = etch;
})();
