var welcome_panel = '<!-- Welcome panel -->'+
                    '<div class="modal hide fade modalwindow" id="welcomemodal">'+
                        '<div class="modal-header">'+
                            '<h3>Welcome to Fullslider</h3>'+
                        '</div>'+
                        '<div class="modal-body">'+
                            '<div>You can create a new presentation or open file from your device</div>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<a href="#" class="btn btn-primary newpresopanel"> <i class="fa fa-plus"></i> &nbsp; New presentation</a>'+
                            '<a href="#" class="btn btn-success loadpresbtn"><i class="glyphicon glyphicon-folder-open"></i>&nbsp; Open presentation</a>'+
                        '</div>'+
                    '</div>'+
                    '<!-- End of new preso modal-->';
        
var slidethumb = '<div id="slidethumb_^UID^" class="slidethumb thumbelement center-block context-menu-slides">'+
					 '<div class="thumbnailholder"></div>'+
					 '<canvas class="slidemask" id="slidethumb_^UID^" style="z-index:1000; width:100%; height:100%; background-color:#FFF; opacity:0.1; left:0px; top:0px; position:absolute"></canvas>'+
					'<a id="deletebtn" data-parent="slidethumb_^UID^" style="z-index:1001;" class="btn btn-info btn-small deletebtn"><i class="fa fa-close"></i></a>'+
				 '</div>';
var text_snippet = '<div class="slidelement editable" id="slidelement_id" data-button-class="text" data-parent="fullslider_slide__slidenumber__" data-type="text"><div>Sample Text</div> </div>';
var fullslider_slide = '<section class="fullslider-slide" id="fullslider_slide__slidenumber__"></section>';
var saved_presentations = '<div class="savedpresos">' +
                                    '<div class="presothumbcontent">' +
                                        '<h3 style="display:inline-block; color:#2980B9"> __presotitle__</h3>'+
                                    '</div>'+
                                    '<div class="presothumb" >'+
                                        '<a href="#"  data-id="__presoid__" class="btn btn-inline btn-info openpresobtn"><i class="glyphicon glyphicon-pencil"></i></a>' +
                                        '<a href="#"  data-id="__presoid__" class="btn btn-inline btn-danger deletepresobtn"><i class="fa fa-trash"></i></a></br>'+
                                    '</div>' +
                            '</div>';
var font_size_selector = '<div id="etch-font-size" class="btn-group">'+
                                '<a class="btn btn-small btn-inverse dropdown-toggle" data-toggle="dropdown" title="Choose the font size"><span class="text fontSizeReadout">72</span>' +
                                        '<span class="caret"></span></a>' +
                                '<ul class="dropdown-menu" data-option="fontSize">' +
                                        '<li>' +
                                          '<a class="is-etch-button" href="#" data-value="10">10 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="9">9 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="8">8 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="7">7 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="6">6 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="5">5 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="4">4 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="3.5">3.5 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="3">3 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="2.75">2.75 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="2.5">2.5 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="2.25">2.25 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="2">2 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="1.75">1.75 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="1.5">1.5 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="1.25">1.25 vw</a>' +
                                          '<a class="is-etch-button" href="#" data-value="1">1 vw</a>' +
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
                                          '<a class="dancingscript is-etch-button" href="#" data-value="\'Dancing Script\', cursive">Dancing Script</a>'+
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
                            '<a href="#" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-remove"></i> Close</a>'+
                            '<a href="#" class="btn btn-primary" id="appendimagebtn"> <i class="fa fa-plus"></i> Add</a>'+
                        '</div>'+
                    '</div>';
            

var my_pres_modal= '<!-- Saved Presentations Modal -->'+
                   '<div class="modal hide fade modalwindow" id="savedpresentationsmodal">'+
                        '<div class="modal-header">'+
                            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                            '<h3>My Presentations</h3>'+
                        '</div>'+
                        '<div class="modal-body" id="savedpresentations">'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<a href="#" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-remove"></i> Close</a>'+
                        '</div>'+
                    '</div>'+
                    '<!-- End Saved Presentations Modal -->';
 
var new_pres_modal= '<!-- New Presentation Modal -->'+
                    '<div class="modal hide fade modalwindow" id="newpresentationmodal">'+
                        '<div class="modal-header">'+
                            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                            '<h3 id="newpresoheader">New Presentation</h3>'+
                        '</div>'+
                        '<div class="modal-body">'+
                            '<p>Title</p>'+
                            '<input type="text" id="titleinput" class="image-input" value="New Presentation"> </input>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<a href="#" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-remove"></i> Close</a>'+
                            '<a href="#" class="btn btn-primary createpresentation"> <i class="fa fa-plus"></i> &nbsp;Save</a>'+
                        '</div>'+
                    '</div>'+
                    '<!-- End of New Presentation Modal-->';
            
var config_modal= '<!-- Design Configuration Modal -->'+
                    '<div class="modal fade modalwindow" id="configmodal">'+
                        '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3>Configuration</h3></div>'+
                        '<div class="modal-body">'+
                            '<ul id="configTab" class="nav nav-tabs">'+ 
                                '<li role="presentation"><a href="#textFormat">Text Format</a></li>'+
                            '</ul>'+
                            '<div class="tab-content">'+
                                '<div role="tabpanel" class="tab-pane active" id="textFormat">'+
                                    '<div>'+
                                        '<label class="col-sm-2">Type</label>'+
                                        '<label class="col-sm-1">Size</label>'+
                                    '</div>'+

                                    '<ul style="clear: both;">'+
                                        '<li class="row"><span class="col-sm-2">Normal</span> <input class="fixSize col-sm-1" type="number" min="1" max="32"></li>'+
                                        '<li class="row"><span class="col-sm-2">Title</span><input class="fixSize col-sm-1" type="number" min="1" max="32"></li>'+
                                        '<li class="row"><span class="col-sm-2">Subtitle</span><input class="fixSize col-sm-1" type="number" min="1" max="32"></li>'+
                                    '</ul>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<a href="#" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-remove"></i> Close</a>'+
                            '<a href="#" class="btn btn-primary saveconfiguration"> <i class="fa fa-plus"></i> &nbsp;Save</a>'+
                        '</div>'+
                    '</div>'+
                    '<!-- End of Design Configuration Modal-->';
            
            
            
var alert_danger ='<div id="dangeralert" class="alert alert-danger alert-dismissible" role="alert">'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                    '<strong>Error: </strong><span id="dangermsg"></span>'+
                  '</div>';
          
var alert_success ='<div id="successalert" class="alert alert-success alert-dismissible" role="alert">'+
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                    '<strong>Success: </strong><span id="successmsg"></span>'+
                  '</div>';