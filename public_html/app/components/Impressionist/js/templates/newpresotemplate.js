var newpresotemplate = '<div id="newpreso">'+
						   '<h4 id="presotitle" class="settingsboxheader">Title</h4><input id="presotitleinput" type="text"></input>'+
						   '<h4 id="presodescription" class="settingsboxheader">Description</h4><textarea id="presotitledescription"></textarea>'+
						   '<a class="btn btn-large btn-primary btn-inline previewbtn settingsCancelBtn" id="newpresocancel">&nbsp;Cancel</a>'+
          				   '<a class="btn btn-large btn-inline btn-info previewbtn">&nbsp;OK</a>'
          				'</div>'
var slidethumb = '<div id="slidethumb_^UID^" class="slidethumb thumbelement center-block">'+
					 '<div class="thumbnailholder"></div>'+
					 '<canvas class="slidemask" id="slidethumb_^UID^" style="z-index:1000; width:100%; height:100%; background-color:#FFF; opacity:0.1; left:0px; top:0px; position:absolute"></canvas>'+
					'<a id="deletebtn" data-parent="slidethumb_^UID^" style="z-index:1001;" class="btn btn-info btn-small deletebtn"><i class="fui-cross-16"></i></a>'+
				 '</div>';
var text_snippet = '<div class="slidelement editable" id="slidelement_id" data-button-class="text" data-parent="impress_slide__slidenumber__" data-type="text"><div>Sample Text</div> </div>';
var impress_slide = '<div class="impress-slide" id="impress_slide__slidenumber__"></div>';
var saved_presentations = '<div class="savedpresos">' +
                                    '<div class="presothumbcontent">' +
                                        '<h3 style="display:inline-block; color:#2980B9"> __presotitle__</h3>'+
                                        '<p style="font-size: 120%">__presodescription__</p>'+
                                    '</div>'+
                                    '<div class="presothumb idle" >'+
                                        '<a href="#"  data-id="__presoid__" class="btn btn-inline btn-info openpresobtn" style="position:absolute; right: 10px; top: 10px"><i class="fui-eye-16"></i></a>' +
                                        '<a href="#"  data-id="__presoid__" class="btn btn-inline btn-danger deletepresobtn" style="position:absolute; right: 60px; top: 10px"><i class="icon-trash"></i></a></br>'+
                                    '</div>' +
                            '</div>';
var font_size_selector = '<div id="etch-font-size" class="btn-group">'+
                                '<a class="btn btn-small btn-inverse dropdown-toggle" data-toggle="dropdown" title="Choose the font size"><span class="text fontSizeReadout">72</span>' +
                                        '<span class="caret"></span></a>' +
                                '<ul class="dropdown-menu" data-option="fontSize">' +
                                        '<li>' +
                                          '<a class="is-etch-button" href="#" data-value="144">144px</a>' +
                                          '<a class="is-etch-button" href="#" data-value="115">115px</a>' +
                                          '<a class="is-etch-button" href="#" data-value="96">96px</a>' +
                                          '<a class="is-etch-button" href="#" data-value="72">72px</a>' +
                                          '<a class="is-etch-button" href="#" data-value="64">64px</a>' +
                                          '<a class="is-etch-button" href="#" data-value="48">48px</a>' +
                                          '<a class="is-etch-button" href="#" data-value="36">36px</a>' +
                                          '<a class="is-etch-button" href="#" data-value="24">24px</a>' +
                                          '<a class="is-etch-button" href="#" data-value="16">16px</a>' +
                                        '</li>' +
                                '</ul>' +
                        '</div>';      

var font_family_selector =  '<div id="etch-font-family" class="btn-group">'+
                                '<a class="btn btn-inverse dropdown-toggle btn-small fontFamilyBtn" data-toggle="dropdown" title="Choose the font family"><span class="text fontFamilyReadout">Lato</span><span class="caret"></span></a>'+
                                '<ul class="dropdown-menu menuBarOption" data-option="fontFamily">'+
                                        '<li>'+
                                          '<a class="abril is-etch-button" href="#" data-value="\'Abril Fatface\', cursive">Abril</a>'+
                                          '<a class="architects is-etch-button" href="#" data-value="\'Architects Daughter\', cursive">Architects Daughter</a>'+
                                          '<a class="bangers is-etch-button" href="#" data-value="\'Bangers\', cursive">Bangers</a>'+
                                          '<a class="blackops is-etch-button" href="#" data-value="\'Black Ops One\', cursive">Black Ops One</a>'+
                                          '<a class="cabin-sketch is-etch-button" href="#" data-value="\'Cabin Sketch\', cursive">Cabin Sketch</a>'+
                                          '<a class="cookie is-etch-button" href="#" data-value="\'Cookie\', cursive">Cookie</a>'+
                                          '<a class="courgette is-etch-button" href="#" data-value="\'Courgette\', cursive">Courgette</a>'+
                                          '<a class="crimson is-etch-button" href="#" data-value="\'Crimson Text\', serif">Crimson Text</a>'+
                                          '<a class="dancingscript is-etch-button" href="#" data-value="\'Dancing Scriptt\', cursive">Dancing Script</a>'+
                                          '<a class="droidsansmono is-etch-button" href="#" data-value="\'Droid Sans Mono\', monospace">Droid Sans Mono</a>'+
                                          '<a class="fredoka is-etch-button" href="#" data-value="\'Fredoka One\', cursive">Fredoka One</a>'+
                                          '<a class="gorditas is-etch-button" href="#" data-value="\'Gorditas\', cursive">Gorditas</a>'+
                                          '<a class="greatvibes is-etch-button" href="#" data-value="\'Great Vibes\', cursive">Great Vibes</a>'+
                                          '<a class="hammersmith is-etch-button" href="#" data-value="\'Hammersmith One\', sans-serif">Hammersmith One</a>'+
                                          '<a class="inconsolata is-etch-button" href="#" data-value="\'Inconsolata\',">Inconsolata</a>'+
                                          '<a class="indieflower is-etch-button" href="#" data-value="\'Indie Flower\', cursive">Indie Flower</a>'+
                                          '<a class="lato is-etch-button" href="#" data-value="\'Lato\', sans-serif">Lato</a>'+
                                          '<a class="leaguegothic is-etch-button" href="#" data-value="\'League Gothic\', sans-serif">League Gothic</a>'+
                                          '<a class="lobster is-etch-button" href="#" data-value="\'Lobster\', serif">Lobster</a>'+
                                          '<a class="miltonian is-etch-button" href="#" data-value="\'Miltonian\', cursive">Miltonian</a>'+
                                          '<a class="montserrat is-etch-button" href="#" data-value="\'Montserrat\', sans serif">Montserrat</a>'+
                                          '<a class="niconne is-etch-button" href="#" data-value="\'Niconne\', cursive">Niconne</a>'+
                                          '<a class="pacifico is-etch-button" href="#" data-value="\'Pacifico\', cursive">Pacifico</a>'+
                                          '<a class="playfair is-etch-button" href="#" data-value="\'Playfair Display\', cursive">Playfair Display</a>'+
                                          '<a class="pressstart is-etch-button" href="#" data-value="\'Press Start 2P\', cursive">Press Start 2P</a>'+
                                          '<a class="quicksand is-etch-button" href="#" data-value="\'Quicksand\', sans-serif">Quicksand</a>'+
                                          '<a class="satisfy is-etch-button" href="#" data-value="\'Satisfy\', cursive">Satisfy</a>'+
                                          '<a class="shadows is-etch-button" href="#" data-value="\'Shadows Into Light\', cursive">Shadows Into Light</a>'+
                                          '<a class="specialelite is-etch-button" href="#" data-value="\'Special Elite\', cursive">Special Elite</a>'+
                                          '<a class="tangerine is-etch-button" href="#" data-value="\'Tangerine\', cursive">Tangerine</a>'+
                                          '<a class="ubuntu is-etch-button" href="#" data-value="\'Ubuntu\', sans-serif">Ubuntu</a>'+
                                        '</li>'+
                                '</ul>'+
                            '</div>';
                    
var color_selector='<div class="btn-group"><input class="color-chooser colorpicker etch-color" /></div>';

var add_img_modal ='<div class="modal hide fade modalwindow" id="imagemodal">'+
                        '<div class="modal-header">'+
                            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                            '<h3>Add Image</h3>'+
                        '</div>'+
                        '<div class="modal-body">'+
                            '<p>Paste Image URL</p>'+
                            '<input type="text" id="imageinput" class="image-input"> </input>'+
                            '<p> Preview Will appear below</p>'+
                            '<img id="previewimg"></img>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<a href="#" class="btn btn-danger" data-dismiss="modal"><i class="icon-remove"></i> Close</a>'+
                            '<a href="#" class="btn btn-primary" id="appendimagebtn"> <i class="icon-plus"></i> Add</a>'+
                        '</div>'+
                    '</div>';
//
//
//        '<div id="imagemodal" class="modal-header">'+
//                        '<button class="close" data-dismiss="modal">×</button>'+
//                        '<h3>{{title}}</h3>'+
//                    '</div>'+
//                    '<div class="modal-body" style="overflow: hidden">'+
//                        '<div class="alert alert-error dispNone">'+
//                            '<button class="close" data-dismiss="alert">×</button>'+
//                            'The image URL you entered appears to be incorrect'+
//                        '</div>'+
//                        '<h4>URL:</h4><div class="form-inline"><input type="text" name="itemUrl"></input>&nbsp;{{#browsable}}<div data-option="browse" class="btn">Browse</div>'+
//                        '<p><em>*Local images are currently uploaded to imgur.<br/>We\'re working on changing this.</em></p>{{/browsable}}</div>'+
//                        '<input type="file" style="display:none"></input>'+
//                        '<h4>Preview:</h4>'+
//                        '<ul class="thumbnails">'+
//                            '<li class="span4">'+
//                                '<div class="thumbnail">'+
//                                        '<{{tag}} class="preview" width="360" height"268"></{{tag}}>'+
//                                '</div>'+
//                                '<div class="progress active progress-striped dispNone">'+
//                                        '<div class="bar"></div>'+
//                                '</div>'+
//                            '</li>'+
//                        '</ul>'+
//                    '</div>'+
//                    '<div class="modal-footer">'+
//                        '<a href="#" class="btn btn-primary ok btn-inverse">{{title}}</a>'+
//                    '</div>';
